import { inject, Injectable, signal, computed, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { Role } from '@core/enums/role.enum';
import { SKIP_AUTH } from '@core/http/http-context-tokens';
import { environment } from '../../../environments/environment';
import { TokenStorage } from './token-storage.service';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: Role[];
}

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  avatar?: string;
  roles: string[];
  exp: number;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken?: string;
}

const TOKEN_CHECK_INTERVAL = 60_000;
const IDLE_TIMEOUT_MS = 30 * 60_000;
const ACTIVITY_EVENTS: readonly (keyof WindowEventMap)[] = [
  'mousedown',
  'keydown',
  'scroll',
  'touchstart',
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly storage = inject(TokenStorage);
  private readonly http = inject(HttpClient);
  private readonly currentUser = signal<User | null>(null);
  private lastActivity = Date.now();
  private refreshInFlight$: Observable<string | null> | null = null;
  private readonly forceLogout$ = new Subject<void>();
  private initialized = false;

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly roles = computed(() => this.user()?.roles ?? []);
  readonly onForceLogout = this.forceLogout$.asObservable();

  // Called once at bootstrap via provideAppInitializer — idempotent, safe to call in tests.
  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;
    this.loadUserFromToken();
    this.fetchMe().subscribe();
    this.startTokenExpiryCheck();
    this.trackActivity();
  }

  login(accessToken: string, refreshToken?: string): void {
    this.storage.setAccess(accessToken);
    if (refreshToken) this.storage.setRefresh(refreshToken);
    this.lastActivity = Date.now();
    this.loadUserFromToken();
    this.fetchMe().subscribe();
  }

  logout(navigate = true): void {
    this.storage.clear();
    this.currentUser.set(null);
    this.forceLogout$.next();
    if (navigate) this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (environment.authMode === 'cookie') return null;

    const token = this.storage.getAccess();
    if (!token) return null;

    const payload = this.decodeToken(token);
    if (!payload || this.isTokenExpired(payload)) return null;

    return token;
  }

  hasRole(role: Role): boolean {
    return this.roles().includes(role);
  }

  hasAnyRole(roles: Role[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  refresh(): Observable<string | null> {
    if (this.refreshInFlight$) return this.refreshInFlight$;

    const refreshToken = this.storage.getRefresh();
    if (environment.authMode === 'bearer' && !refreshToken) {
      return of(null);
    }

    const body = environment.authMode === 'bearer' ? { refreshToken } : {};
    const ctx = new HttpContext().set(SKIP_AUTH, true);

    this.refreshInFlight$ = this.http
      .post<RefreshResponse>('/api/auth/refresh', body, {
        context: ctx,
        withCredentials: environment.authMode === 'cookie',
      })
      .pipe(
        map((res) => {
          if (res?.accessToken) this.storage.setAccess(res.accessToken);
          if (res?.refreshToken) this.storage.setRefresh(res.refreshToken);
          this.loadUserFromToken();
          return res?.accessToken ?? null;
        }),
        catchError(() => {
          this.logout();
          return of(null);
        }),
        finalize(() => (this.refreshInFlight$ = null)),
        shareReplay(1),
      );

    return this.refreshInFlight$;
  }

  fetchMe(): Observable<User | null> {
    if (environment.authMode === 'bearer' && !this.storage.getAccess()) return of(null);

    return this.http
      .get<User>('/api/auth/me', {
        withCredentials: environment.authMode === 'cookie',
      })
      .pipe(
        tap((user) => this.currentUser.set(user)),
        catchError(() => of(null)),
      );
  }

  private loadUserFromToken(): void {
    if (environment.authMode === 'cookie') return;

    const token = this.storage.getAccess();
    if (!token) return;

    const payload = this.decodeToken(token);
    if (!payload || this.isTokenExpired(payload)) {
      this.logout(false);
      return;
    }

    this.currentUser.set({
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.avatar,
      roles: payload.roles as Role[],
    });
  }

  private startTokenExpiryCheck(): void {
    const intervalId = setInterval(() => {
      if (!this.isAuthenticated()) return;

      if (Date.now() - this.lastActivity > IDLE_TIMEOUT_MS) {
        this.logout();
        return;
      }

      if (environment.authMode === 'cookie') return;

      const token = this.storage.getAccess();
      if (!token) return;
      const payload = this.decodeToken(token);
      if (!payload || this.isTokenExpired(payload)) {
        this.refresh().subscribe((newToken) => {
          if (!newToken) this.logout();
        });
      }
    }, TOKEN_CHECK_INTERVAL);

    this.destroyRef.onDestroy(() => clearInterval(intervalId));
  }

  private trackActivity(): void {
    const handler = () => {
      this.lastActivity = Date.now();
    };
    ACTIVITY_EVENTS.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    this.destroyRef.onDestroy(() => {
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, handler));
    });
  }

  private decodeToken(token: string): TokenPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const binary = atob(padded);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      const json = new TextDecoder('utf-8').decode(bytes);
      return JSON.parse(json);
    } catch {
      return null;
    }
  }

  private isTokenExpired(payload: TokenPayload): boolean {
    return payload.exp * 1000 < Date.now();
  }
}

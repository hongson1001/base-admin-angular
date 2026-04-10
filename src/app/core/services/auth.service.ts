import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@core/enums/role.enum';

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

const TOKEN_KEY = 'access_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly currentUser = signal<User | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly roles = computed(() => this.user()?.roles ?? []);

  constructor() {
    this.loadUser();
  }

  login(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.loadUser();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  hasRole(role: Role): boolean {
    return this.roles().includes(role);
  }

  hasAnyRole(roles: Role[]): boolean {
    return roles.some((role) => this.hasRole(role));
  }

  private loadUser(): void {
    const token = this.getToken();
    if (!token) return;

    const payload = this.decodeToken(token);
    if (!payload || this.isTokenExpired(payload)) {
      this.logout();
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

  private decodeToken(token: string): TokenPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  private isTokenExpired(payload: TokenPayload): boolean {
    return payload.exp * 1000 < Date.now();
  }
}

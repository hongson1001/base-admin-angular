import { Injectable } from '@angular/core';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private memoryAccess: string | null = null;
  private memoryRefresh: string | null = null;

  setAccess(token: string): void {
    this.memoryAccess = token;
    this.write(ACCESS_KEY, token);
  }

  getAccess(): string | null {
    if (this.memoryAccess) return this.memoryAccess;
    const t = this.read(ACCESS_KEY);
    if (t) this.memoryAccess = t;
    return t;
  }

  setRefresh(token: string): void {
    this.memoryRefresh = token;
    this.write(REFRESH_KEY, token);
  }

  getRefresh(): string | null {
    if (this.memoryRefresh) return this.memoryRefresh;
    const t = this.read(REFRESH_KEY);
    if (t) this.memoryRefresh = t;
    return t;
  }

  clear(): void {
    this.memoryAccess = null;
    this.memoryRefresh = null;
    this.remove(ACCESS_KEY);
    this.remove(REFRESH_KEY);
  }

  private read(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // storage blocked (private mode / quota) — in-memory still works
    }
  }

  private remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { SKIP_AUTH } from '@core/http/http-context-tokens';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) return next(req);

  const authService = inject(AuthService);
  const prepared = prepareRequest(req, authService);

  return next(prepared).pipe(
    catchError((err: unknown) => {
      if (!(err instanceof HttpErrorResponse)) return throwError(() => err);

      if (err.status === 401) {
        return handle401(prepared, next, authService);
      }
      if (err.status === 403) {
        console.warn('Access denied');
      }
      return throwError(() => err);
    }),
  );
};

function prepareRequest(req: HttpRequest<unknown>, authService: AuthService): HttpRequest<unknown> {
  if (environment.authMode === 'cookie') {
    return req.clone({ withCredentials: true });
  }

  const token = authService.getToken();
  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

function handle401(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
): Observable<HttpEvent<unknown>> {
  return authService.refresh().pipe(
    switchMap((newToken) => {
      if (environment.authMode === 'cookie') {
        return next(req.clone({ withCredentials: true }));
      }
      if (!newToken) {
        authService.logout();
        return throwError(() => new HttpErrorResponse({ status: 401 }));
      }
      return next(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }));
    }),
  );
}

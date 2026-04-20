import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '@core/services/message.service';

// Toast a generic message on server errors (5xx) and network failures (status 0).
// 4xx stays silent — caller decides how to surface (validation errors, 401 handled by auth).
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const message = inject(MessageService);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 0) {
          message.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.');
        } else if (err.status >= 500) {
          message.error('Có lỗi xảy ra từ máy chủ. Vui lòng thử lại.');
        }
      }
      return throwError(() => err);
    }),
  );
};

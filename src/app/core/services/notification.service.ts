import { inject, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly nzNotification = inject(NzNotificationService);

  success(title: string, content = ''): void {
    this.nzNotification.success(title, content);
  }

  error(title: string, content = ''): void {
    this.nzNotification.error(title, content);
  }

  warning(title: string, content = ''): void {
    this.nzNotification.warning(title, content);
  }

  info(title: string, content = ''): void {
    this.nzNotification.info(title, content);
  }
}

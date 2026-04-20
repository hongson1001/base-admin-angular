import { inject, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly nzMessage = inject(NzMessageService);

  success(content: string): void {
    this.nzMessage.success(content);
  }

  error(content: string): void {
    this.nzMessage.error(content);
  }

  warning(content: string): void {
    this.nzMessage.warning(content);
  }

  info(content: string): void {
    this.nzMessage.info(content);
  }

  // Returns the message id so the caller can dismiss explicitly (e.g. after an async op).
  // Defaults to nzDuration: 0 = sticky.
  loading(content: string): string {
    return this.nzMessage.loading(content, { nzDuration: 0 }).messageId;
  }

  dismiss(messageId?: string): void {
    this.nzMessage.remove(messageId);
  }
}

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

  loading(content: string): void {
    this.nzMessage.loading(content);
  }
}

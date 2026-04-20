import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly nzModal = inject(NzModalService);

  confirm(title: string, content = ''): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const ref = this.nzModal.confirm({
        nzTitle: title,
        nzContent: content,
        nzOkText: 'Confirm',
        nzCancelText: 'Cancel',
        nzOkDanger: true,
        nzOnOk: () => true,
        nzOnCancel: () => false,
      });

      const sub = ref.afterClose.subscribe((result) => {
        subscriber.next(result === true);
        subscriber.complete();
      });

      return () => sub.unsubscribe();
    });
  }

  delete(itemName = ''): Observable<boolean> {
    const content = itemName
      ? `Are you sure you want to delete "${itemName}"?`
      : 'Are you sure you want to delete this item?';
    return this.confirm('Confirm Delete', content);
  }

  info(title: string, content = ''): void {
    this.nzModal.info({ nzTitle: title, nzContent: content });
  }

  warning(title: string, content = ''): void {
    this.nzModal.warning({ nzTitle: title, nzContent: content });
  }
}

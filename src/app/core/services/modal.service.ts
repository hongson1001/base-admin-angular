import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly nzModal = inject(NzModalService);

  confirm(title: string, content = ''): Observable<boolean> {
    const result$ = new Subject<boolean>();

    this.nzModal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOkText: 'Confirm',
      nzCancelText: 'Cancel',
      nzOkDanger: true,
      nzOnOk: () => {
        result$.next(true);
        result$.complete();
      },
      nzOnCancel: () => {
        result$.next(false);
        result$.complete();
      },
    });

    return result$.asObservable();
  }

  delete(itemName = ''): Observable<boolean> {
    const content = itemName ? `Are you sure you want to delete "${itemName}"?` : 'Are you sure you want to delete this item?';
    return this.confirm('Confirm Delete', content);
  }

  info(title: string, content = ''): void {
    this.nzModal.info({ nzTitle: title, nzContent: content });
  }

  warning(title: string, content = ''): void {
    this.nzModal.warning({ nzTitle: title, nzContent: content });
  }
}

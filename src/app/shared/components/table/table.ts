import { ChangeDetectionStrategy, Component, input, output, model, contentChild, TemplateRef } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';

export interface TablePageEvent {
  pageIndex: number;
  pageSize: number;
}

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTableModule, NzPaginationModule, NzEmptyModule, NzSpinModule],
  template: `
    <nz-table
      #table
      [nzData]="data()"
      [nzLoading]="loading()"
      [nzTotal]="total()"
      [nzPageIndex]="pageIndex()"
      [nzPageSize]="pageSize()"
      [nzFrontPagination]="frontPagination()"
      [nzShowPagination]="showPagination()"
      [nzShowSizeChanger]="showSizeChanger()"
      [nzPageSizeOptions]="pageSizeOptions()"
      [nzBordered]="bordered()"
      [nzSize]="size()"
      [nzScroll]="scroll()"
      (nzPageIndexChange)="onPageChange($event, table.nzPageSize)"
      (nzPageSizeChange)="onPageChange(table.nzPageIndex, $event)"
    >
      <ng-content />
    </nz-table>
  `,
})
export class Table<T = unknown> {
  readonly data = input<T[]>([]);
  readonly loading = input(false);
  readonly total = input(0);
  readonly pageIndex = model(1);
  readonly pageSize = model(10);
  readonly frontPagination = input(true);
  readonly showPagination = input(true);
  readonly showSizeChanger = input(true);
  readonly pageSizeOptions = input([10, 20, 50, 100]);
  readonly bordered = input(false);
  readonly size = input<'default' | 'middle' | 'small'>('default');
  readonly scroll = input<{ x?: string; y?: string }>({});
  readonly pageChange = output<TablePageEvent>();

  onPageChange(pageIndex: number, pageSize: number): void {
    this.pageIndex.set(pageIndex);
    this.pageSize.set(pageSize);
    this.pageChange.emit({ pageIndex, pageSize });
  }
}

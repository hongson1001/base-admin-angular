import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-tree-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
      [nzNodes]="nodes()"
      [nzPlaceHolder]="placeholder()"
      [nzShowSearch]="showSearch()"
      [nzMultiple]="multiple()"
      [nzCheckable]="checkable()"
      [nzAllowClear]="allowClear()"
      [nzDisabled]="disabled()"
      [nzSize]="size()"
      [nzDefaultExpandAll]="expandAll()"
      style="width: 100%"
    />
  `,
})
export class TreeSelect {
  readonly value = model<string | string[]>('');
  readonly nodes = input<NzTreeNodeOptions[]>([]);
  readonly placeholder = input('Please select');
  readonly showSearch = input(false);
  readonly multiple = input(false);
  readonly checkable = input(false);
  readonly allowClear = input(false);
  readonly disabled = input(false);
  readonly expandAll = input(false);
  readonly size = input<'large' | 'default' | 'small'>('default');
}

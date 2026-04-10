import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

export interface SelectOption {
  label: string;
  value: unknown;
  disabled?: boolean;
  groupLabel?: string;
}

@Component({
  selector: 'app-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
      [nzPlaceHolder]="placeholder()"
      [nzMode]="mode()"
      [nzSize]="size()"
      [nzDisabled]="disabled()"
      [nzShowSearch]="showSearch()"
      [nzAllowClear]="allowClear()"
      [nzLoading]="loading()"
      [nzMaxTagCount]="maxTagCount()"
      [nzServerSearch]="serverSearch()"
      (nzOnSearch)="searched.emit($event)"
      style="width: 100%"
    >
      @for (option of options(); track option.value) {
        <nz-option
          [nzLabel]="option.label"
          [nzValue]="option.value"
          [nzDisabled]="option.disabled ?? false"
        />
      }
    </nz-select>
  `,
})
export class Select {
  readonly value = model<unknown>(null);
  readonly options = input<SelectOption[]>([]);
  readonly placeholder = input('Please select');
  readonly mode = input<'default' | 'multiple' | 'tags'>('default');
  readonly size = input<'large' | 'default' | 'small'>('default');
  readonly disabled = input(false);
  readonly showSearch = input(false);
  readonly allowClear = input(false);
  readonly loading = input(false);
  readonly serverSearch = input(false);
  readonly maxTagCount = input(0);
  readonly searched = output<string>();
}

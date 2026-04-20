import { ChangeDetectionStrategy, Component, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  template: `
    <nz-select
      [ngModel]="value()"
      (ngModelChange)="onValueChange($event)"
      (nzBlur)="onTouched()"
      [nzPlaceHolder]="placeholder()"
      [nzMode]="mode()"
      [nzSize]="size()"
      [nzDisabled]="isDisabled()"
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
export class Select implements ControlValueAccessor {
  readonly options = input<SelectOption[]>([]);
  readonly placeholder = input('Please select');
  readonly mode = input<'default' | 'multiple' | 'tags'>('default');
  readonly size = input<'large' | 'default' | 'small'>('default');
  readonly showSearch = input(false);
  readonly allowClear = input(false);
  readonly loading = input(false);
  readonly serverSearch = input(false);
  readonly maxTagCount = input(0);
  readonly searched = output<string>();

  readonly value = signal<unknown>(null);
  readonly isDisabled = signal(false);

  private onChange: (value: unknown) => void = () => {};
  onTouched: () => void = () => {};

  onValueChange(val: unknown): void {
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: unknown): void {
    this.value.set(val ?? null);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }
}

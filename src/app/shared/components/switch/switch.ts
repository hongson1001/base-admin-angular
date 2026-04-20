import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzSwitchModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
  template: `
    <nz-switch
      [ngModel]="checked()"
      (ngModelChange)="onValueChange($event)"
      [nzCheckedChildren]="checkedLabel()"
      [nzUnCheckedChildren]="uncheckedLabel()"
      [nzDisabled]="isDisabled()"
      [nzLoading]="loading()"
      [nzSize]="size()"
    />
  `,
})
export class Switch implements ControlValueAccessor {
  readonly loading = input(false);
  readonly size = input<'default' | 'small'>('default');
  readonly checkedLabel = input('');
  readonly uncheckedLabel = input('');

  readonly checked = signal(false);
  readonly isDisabled = signal(false);

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  onValueChange(val: boolean): void {
    this.checked.set(val);
    this.onChange(val);
    this.onTouched();
  }

  writeValue(val: boolean): void {
    this.checked.set(val ?? false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }
}

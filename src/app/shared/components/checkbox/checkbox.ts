import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type CheckboxValue = boolean | string[];

@Component({
  selector: 'app-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzCheckboxModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
  template: `
    @if (options().length) {
      <nz-checkbox-group
        [nzOptions]="options()"
        [ngModel]="selectedValues()"
        (ngModelChange)="onGroupChange($event)"
        [nzDisabled]="isDisabled()"
      />
    } @else {
      <label
        nz-checkbox
        [ngModel]="checked()"
        (ngModelChange)="onCheckedChange($event)"
        [nzDisabled]="isDisabled()"
      >
        <ng-content />
      </label>
    }
  `,
})
export class Checkbox implements ControlValueAccessor {
  readonly options = input<CheckboxOption[]>([]);

  readonly checked = signal(false);
  readonly selectedValues = signal<string[]>([]);
  readonly isDisabled = signal(false);

  private onChange: (value: CheckboxValue) => void = () => {};
  onTouched: () => void = () => {};

  onCheckedChange(val: boolean): void {
    this.checked.set(val);
    this.onChange(val);
    this.onTouched();
  }

  onGroupChange(val: Array<string | number> | null): void {
    const selected = (val ?? []).map((v) => String(v));
    this.selectedValues.set(selected);
    this.onChange(selected);
    this.onTouched();
  }

  writeValue(val: CheckboxValue | null): void {
    if (Array.isArray(val)) {
      this.selectedValues.set(val);
      this.checked.set(false);
    } else {
      this.checked.set(val ?? false);
      this.selectedValues.set([]);
    }
  }

  registerOnChange(fn: (value: CheckboxValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }
}

import { ChangeDetectionStrategy, Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

export type InputSize = 'large' | 'default' | 'small';

@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzInputModule, NzIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInput),
      multi: true,
    },
  ],
  template: `
    @if (prefixIcon() || suffixIcon()) {
      <nz-input-group
        class="app-input-group"
        [nzPrefixIcon]="prefixIcon()"
        [nzSuffixIcon]="suffixIcon()"
        [nzSize]="size()"
      >
        <input
          nz-input
          class="app-input"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="isDisabled()"
          [readonly]="readonly()"
          [ngModel]="value()"
          (ngModelChange)="onValueChange($event)"
          (blur)="onTouched()"
        />
      </nz-input-group>
    } @else {
      <input
        nz-input
        class="app-input"
        [nzSize]="size()"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [readonly]="readonly()"
        [ngModel]="value()"
        (ngModelChange)="onValueChange($event)"
        (blur)="onTouched()"
      />
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .app-input-group,
    .app-input {
      border-radius: 10px !important;
    }
    .app-input-group {
      border: 1px solid #e2e8f0;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .app-input-group:focus-within {
      border-color: #4fd1c5;
      box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.15);
    }
    .app-input:not(:focus) {
      border-color: #e2e8f0;
    }
    .app-input:focus {
      border-color: #4fd1c5;
      box-shadow: 0 0 0 2px rgba(79, 209, 197, 0.15);
    }
    .app-input::placeholder {
      color: #a0aec0;
    }
  `,
})
export class AppInput implements ControlValueAccessor {
  readonly type = input('text');
  readonly placeholder = input('');
  readonly size = input<InputSize>('default');
  readonly readonly = input(false);
  readonly prefixIcon = input('');
  readonly suffixIcon = input('');

  readonly value = signal('');
  readonly isDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onValueChange(val: string): void {
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled.set(disabled);
  }
}

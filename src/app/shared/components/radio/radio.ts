import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';

export interface RadioOption {
  label: string;
  value: unknown;
  disabled?: boolean;
}

@Component({
  selector: 'app-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzRadioModule],
  template: `
    <nz-radio-group
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
      [nzSize]="size()"
      [nzButtonStyle]="buttonStyle()"
      [nzDisabled]="disabled()"
    >
      @for (option of options(); track option.value) {
        @if (button()) {
          <label nz-radio-button [nzValue]="option.value" [nzDisabled]="option.disabled ?? false">
            {{ option.label }}
          </label>
        } @else {
          <label nz-radio [nzValue]="option.value" [nzDisabled]="option.disabled ?? false">
            {{ option.label }}
          </label>
        }
      }
    </nz-radio-group>
  `,
})
export class Radio {
  readonly value = model<unknown>(null);
  readonly options = input<RadioOption[]>([]);
  readonly disabled = input(false);
  readonly button = input(false);
  readonly size = input<'large' | 'default' | 'small'>('default');
  readonly buttonStyle = input<'outline' | 'solid'>('outline');
}

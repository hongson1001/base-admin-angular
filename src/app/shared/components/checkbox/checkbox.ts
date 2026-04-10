import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzCheckboxModule],
  template: `
    @if (options().length) {
      <nz-checkbox-group
        [ngModel]="groupValue()"
        (ngModelChange)="groupValue.set($event)"
        [nzDisabled]="disabled()"
      />
    } @else {
      <label
        nz-checkbox
        [ngModel]="checked()"
        (ngModelChange)="checked.set($event)"
        [nzDisabled]="disabled()"
      >
        <ng-content />
      </label>
    }
  `,
})
export class Checkbox {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly options = input<CheckboxOption[]>([]);
  readonly groupValue = model<Array<{ label: string; value: string; checked: boolean }>>([]);
}

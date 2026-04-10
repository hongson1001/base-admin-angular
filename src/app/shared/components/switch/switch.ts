import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzSwitchModule],
  template: `
    <nz-switch
      [ngModel]="checked()"
      (ngModelChange)="checked.set($event)"
      [nzCheckedChildren]="checkedLabel()"
      [nzUnCheckedChildren]="uncheckedLabel()"
      [nzDisabled]="disabled()"
      [nzLoading]="loading()"
      [nzSize]="size()"
    />
  `,
})
export class Switch {
  readonly checked = model(false);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly size = input<'default' | 'small'>('default');
  readonly checkedLabel = input('');
  readonly uncheckedLabel = input('');
}

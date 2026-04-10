import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'app-time-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzTimePickerModule],
  template: `
    <nz-time-picker
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
      [nzFormat]="format()"
      [nzPlaceHolder]="placeholder()"
      [nzDisabled]="disabled()"
      [nzSize]="size()"
      [nzUse12Hours]="use12Hours()"
      [nzHourStep]="hourStep()"
      [nzMinuteStep]="minuteStep()"
      [nzSecondStep]="secondStep()"
      style="width: 100%"
    />
  `,
})
export class TimePicker {
  readonly value = model<Date | null>(null);
  readonly format = input('HH:mm:ss');
  readonly placeholder = input('Select time');
  readonly disabled = input(false);
  readonly size = input<'large' | 'default' | 'small'>('default');
  readonly use12Hours = input(false);
  readonly hourStep = input(1);
  readonly minuteStep = input(1);
  readonly secondStep = input(1);
}

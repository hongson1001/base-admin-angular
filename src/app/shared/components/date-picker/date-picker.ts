import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

export type DatePickerMode = 'date' | 'week' | 'month' | 'quarter' | 'year';

@Component({
  selector: 'app-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzDatePickerModule],
  template: `
    @if (range()) {
      <nz-range-picker
        [ngModel]="rangeValue()"
        (ngModelChange)="rangeValue.set($event)"
        [nzFormat]="format()"
        [nzPlaceHolder]="rangePlaceholder()"
        [nzShowTime]="showTime()"
        [nzDisabled]="disabled()"
        [nzSize]="size()"
        style="width: 100%"
      />
    } @else {
      <nz-date-picker
        [ngModel]="value()"
        (ngModelChange)="value.set($event)"
        [nzMode]="mode()"
        [nzFormat]="format()"
        [nzPlaceHolder]="placeholder()"
        [nzShowTime]="showTime()"
        [nzDisabled]="disabled()"
        [nzSize]="size()"
        style="width: 100%"
      />
    }
  `,
})
export class DatePicker {
  readonly value = model<Date | null>(null);
  readonly rangeValue = model<[Date, Date] | null>(null);
  readonly range = input(false);
  readonly mode = input<DatePickerMode>('date');
  readonly format = input('dd/MM/yyyy');
  readonly placeholder = input('Select date');
  readonly rangePlaceholder = input<[string, string]>(['Start date', 'End date']);
  readonly showTime = input(false);
  readonly disabled = input(false);
  readonly size = input<'large' | 'default' | 'small'>('default');
}

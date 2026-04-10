import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'app-qr-code',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzQRCodeModule],
  template: `
    <nz-qrcode
      [nzValue]="value()"
      [nzSize]="size()"
      [nzLevel]="level()"
      [nzPadding]="padding()"
      [nzColor]="color()"
      [nzBgColor]="bgColor()"
    />
  `,
})
export class QrCode {
  readonly value = input.required<string>();
  readonly size = input(160);
  readonly level = input<'L' | 'M' | 'Q' | 'H'>('M');
  readonly padding = input(0);
  readonly color = input('#000000');
  readonly bgColor = input('#ffffff');
}

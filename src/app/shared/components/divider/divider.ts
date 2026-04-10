import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDividerModule],
  template: `
    <nz-divider
      [nzType]="type()"
      [nzDashed]="dashed()"
      [nzOrientation]="orientation()"
      [nzText]="text()"
    />
  `,
})
export class Divider {
  readonly type = input<'horizontal' | 'vertical'>('horizontal');
  readonly dashed = input(false);
  readonly orientation = input<'left' | 'right' | 'center'>('center');
  readonly text = input('');
}

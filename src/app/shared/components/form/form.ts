import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

@Component({
  selector: 'app-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzFormModule],
  template: `
    <form nz-form [nzLayout]="layout()" [nzAutoTips]="autoTips()">
      <ng-content />
    </form>
  `,
})
export class Form {
  readonly layout = input<FormLayout>('vertical');
  readonly autoTips = input<Record<string, Record<string, string>>>({
    vi: {
      required: 'This field is required',
      email: 'Invalid email format',
    },
    default: {
      required: 'This field is required',
      email: 'Invalid email format',
    },
  });
}

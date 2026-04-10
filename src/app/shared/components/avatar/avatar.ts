import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAvatarModule, NzIconModule],
  template: `
    <nz-avatar
      [nzSrc]="src()"
      [nzText]="text()"
      [nzIcon]="icon()"
      [nzSize]="size()"
      [nzShape]="shape()"
      [nzAlt]="alt()"
    />
  `,
})
export class Avatar {
  readonly src = input('');
  readonly text = input('');
  readonly icon = input('user');
  readonly size = input<number | 'large' | 'small' | 'default'>('default');
  readonly shape = input<'circle' | 'square'>('circle');
  readonly alt = input('');
}

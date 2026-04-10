import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTagModule, NzIconModule],
  template: `
    <nz-tag
      [nzColor]="color()"
      [nzMode]="mode()"
      [nzChecked]="checked()"
      (nzOnClose)="closed.emit()"
      (nzCheckedChange)="checkedChange.emit($event)"
    >
      @if (icon()) {
        <nz-icon [nzType]="icon()" />
      }
      <ng-content />
    </nz-tag>
  `,
})
export class Tag {
  readonly color = input('');
  readonly mode = input<'default' | 'closeable' | 'checkable'>('default');
  readonly checked = input(false);
  readonly icon = input('');
  readonly closed = output<void>();
  readonly checkedChange = output<boolean>();
}

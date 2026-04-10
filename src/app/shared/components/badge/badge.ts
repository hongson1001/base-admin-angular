import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

@Component({
  selector: 'app-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzBadgeModule],
  template: `
    @if (standalone()) {
      <nz-badge
        [nzCount]="count()"
        [nzDot]="dot()"
        [nzShowZero]="showZero()"
        [nzOverflowCount]="overflowCount()"
        [nzStatus]="status()"
        [nzText]="text()"
        [nzColor]="color()"
      />
    } @else {
      <nz-badge
        [nzCount]="count()"
        [nzDot]="dot()"
        [nzShowZero]="showZero()"
        [nzOverflowCount]="overflowCount()"
        [nzOffset]="offset()"
      >
        <ng-content />
      </nz-badge>
    }
  `,
})
export class Badge {
  readonly count = input(0);
  readonly dot = input(false);
  readonly showZero = input(false);
  readonly overflowCount = input(99);
  readonly status = input<'success' | 'processing' | 'default' | 'error' | 'warning' | ''>('');
  readonly text = input('');
  readonly color = input('');
  readonly standalone = input(false);
  readonly offset = input<[number, number] | undefined>(undefined);
}

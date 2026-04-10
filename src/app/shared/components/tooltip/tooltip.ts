import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTooltipModule],
  template: `
    <span
      nz-tooltip
      [nzTooltipTitle]="title()"
      [nzTooltipPlacement]="placement()"
      [nzTooltipTrigger]="trigger()"
      [nzTooltipColor]="color()"
    >
      <ng-content />
    </span>
  `,
  styles: `:host { display: inline-block; }`,
})
export class Tooltip {
  readonly title = input.required<string>();
  readonly placement = input<string>('top');
  readonly trigger = input<'hover' | 'focus' | 'click' | null>('hover');
  readonly color = input('');
}

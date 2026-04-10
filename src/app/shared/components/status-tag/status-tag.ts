import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';

type StatusType = 'success' | 'error' | 'warning' | 'info' | 'default';

const STATUS_COLOR_MAP: Record<StatusType, string> = {
  success: 'green',
  error: 'red',
  warning: 'orange',
  info: 'blue',
  default: 'default',
};

@Component({
  selector: 'app-status-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTagModule],
  template: `
    <nz-tag [nzColor]="color()">{{ label() }}</nz-tag>
  `,
})
export class StatusTag {
  readonly status = input<StatusType>('default');
  readonly label = input.required<string>();
  readonly color = computed(() => STATUS_COLOR_MAP[this.status()]);
}

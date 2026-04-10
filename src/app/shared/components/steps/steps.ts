import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface StepItem {
  title: string;
  description?: string;
  icon?: string;
  status?: 'wait' | 'process' | 'finish' | 'error';
}

@Component({
  selector: 'app-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzStepsModule, NzIconModule],
  template: `
    <nz-steps
      [nzCurrent]="current()"
      [nzDirection]="direction()"
      [nzSize]="size()"
      [nzType]="type()"
      (nzIndexChange)="current.set($event)"
    >
      @for (step of items(); track step.title) {
        <nz-step
          [nzTitle]="step.title"
          [nzDescription]="step.description || ''"
          [nzStatus]="step.status ?? 'wait'"
          [nzIcon]="step.icon || ''"
        />
      }
    </nz-steps>
  `,
})
export class Steps {
  readonly items = input<StepItem[]>([]);
  readonly current = model(0);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly size = input<'default' | 'small'>('default');
  readonly type = input<'default' | 'navigation'>('default');
}

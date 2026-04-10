import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

export interface CollapsePanel {
  title: string;
  content: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-collapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCollapseModule],
  template: `
    <nz-collapse [nzAccordion]="accordion()" [nzBordered]="bordered()" [nzGhost]="ghost()">
      @if (panels().length) {
        @for (panel of panels(); track panel.title) {
          <nz-collapse-panel
            [nzHeader]="panel.title"
            [nzActive]="panel.active ?? false"
            [nzDisabled]="panel.disabled ?? false"
          >
            {{ panel.content }}
          </nz-collapse-panel>
        }
      } @else {
        <ng-content />
      }
    </nz-collapse>
  `,
})
export class Collapse {
  readonly panels = input<CollapsePanel[]>([]);
  readonly accordion = input(false);
  readonly bordered = input(true);
  readonly ghost = input(false);
}

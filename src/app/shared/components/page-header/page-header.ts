import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzBreadCrumbModule, NzIconModule],
  template: `
    <div class="page-header">
      @if (breadcrumbs().length) {
        <nz-breadcrumb>
          @for (crumb of breadcrumbs(); track crumb.label) {
            <nz-breadcrumb-item>
              {{ crumb.label }}
            </nz-breadcrumb-item>
          }
        </nz-breadcrumb>
      }
      <div class="header-row">
        <div>
          <h1 class="page-title">{{ title() }}</h1>
          @if (subtitle()) {
            <p class="page-subtitle">{{ subtitle() }}</p>
          }
        </div>
        <div class="header-actions">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  styles: `
    .page-header {
      margin-bottom: 24px;
    }
    .header-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .page-title {
      font-size: 22px;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0;
    }
    .page-subtitle {
      font-size: 14px;
      color: #8c8c8c;
      margin: 4px 0 0;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    nz-breadcrumb {
      margin-bottom: 12px;
    }
  `,
})
export class PageHeader {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly breadcrumbs = input<{ label: string; link?: string }[]>([]);
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzEmptyModule, NzButtonModule],
  template: `
    <nz-empty
      [nzNotFoundContent]="description()"
      [nzNotFoundImage]="image()"
    >
      <ng-content />
    </nz-empty>
  `,
  styles: `
    :host {
      display: block;
      padding: 48px 0;
    }
  `,
})
export class EmptyState {
  readonly description = input('No data');
  readonly image = input<string>('simple');
}

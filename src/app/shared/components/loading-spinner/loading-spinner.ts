import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzSpinModule],
  template: `
    <div class="spinner-wrapper" [class.fullscreen]="fullscreen()">
      <nz-spin [nzSize]="size()" [nzTip]="tip()" nzSimple />
    </div>
  `,
  styles: `
    .spinner-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 0;
    }
    .spinner-wrapper.fullscreen {
      position: fixed;
      inset: 0;
      background: rgba(255, 255, 255, 0.7);
      z-index: 1000;
      padding: 0;
    }
  `,
})
export class LoadingSpinner {
  readonly size = input<'small' | 'default' | 'large'>('default');
  readonly tip = input('');
  readonly fullscreen = input(false);
}

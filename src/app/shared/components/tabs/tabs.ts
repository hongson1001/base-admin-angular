import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTabsModule],
  template: `
    <nz-tabs
      [nzSelectedIndex]="selectedIndex()"
      [nzType]="type()"
      [nzSize]="size()"
      [nzTabPosition]="position()"
      [nzCentered]="centered()"
      (nzSelectedIndexChange)="onIndexChange($event)"
    >
      <ng-content />
    </nz-tabs>
  `,
})
export class Tabs {
  readonly selectedIndex = model(0);
  readonly type = input<'line' | 'card' | 'editable-card'>('line');
  readonly size = input<'large' | 'default' | 'small'>('default');
  readonly position = input<'top' | 'right' | 'bottom' | 'left'>('top');
  readonly centered = input(false);

  onIndexChange(index: number): void {
    this.selectedIndex.set(index);
  }
}

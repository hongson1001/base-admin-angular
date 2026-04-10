import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

export type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'large' | 'default' | 'small';

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button
      nz-button
      [nzType]="type()"
      [nzSize]="size()"
      [nzDanger]="danger()"
      [nzLoading]="loading()"
      [nzBlock]="block()"
      [nzGhost]="ghost()"
      [nzShape]="shape()"
      [disabled]="disabled()"
      (click)="clicked.emit($event)"
    >
      @if (icon()) {
        <nz-icon [nzType]="icon()" />
      }
      <ng-content />
    </button>
  `,
})
export class Button {
  readonly type = input<ButtonType>('default');
  readonly size = input<ButtonSize>('default');
  readonly icon = input('');
  readonly danger = input(false);
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly block = input(false);
  readonly ghost = input(false);
  readonly shape = input<'circle' | 'round' | null>(null);
  readonly clicked = output<MouseEvent>();
}

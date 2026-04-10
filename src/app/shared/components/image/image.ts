import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzImageModule],
  template: `
    <img
      nz-image
      [nzSrc]="src()"
      [alt]="alt()"
      [style.width]="width()"
      [style.height]="height()"
      [nzDisablePreview]="disablePreview()"
      [nzFallback]="fallback()"
      [nzPlaceholder]="placeholder()"
    />
  `,
  styles: `
    :host { display: inline-block; }
    img { display: block; object-fit: cover; border-radius: 4px; }
  `,
})
export class Image {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly width = input('auto');
  readonly height = input('auto');
  readonly disablePreview = input(false);
  readonly fallback = input('');
  readonly placeholder = input('');
}

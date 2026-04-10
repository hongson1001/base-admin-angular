import { ChangeDetectionStrategy, Component, input, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

export type InputSize = 'large' | 'default' | 'small';

@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzInputModule, NzIconModule],
  template: `
    @if (prefixIcon() || suffixIcon()) {
      <nz-input-group [nzPrefixIcon]="prefixIcon()" [nzSuffixIcon]="suffixIcon()" [nzSize]="size()">
        <input
          nz-input
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [ngModel]="value()"
          (ngModelChange)="value.set($event)"
        />
      </nz-input-group>
    } @else {
      <input
        nz-input
        [nzSize]="size()"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [ngModel]="value()"
        (ngModelChange)="value.set($event)"
      />
    }
  `,
})
export class Input {
  readonly value = model('');
  readonly type = input('text');
  readonly placeholder = input('');
  readonly size = input<InputSize>('default');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly prefixIcon = input('');
  readonly suffixIcon = input('');
}

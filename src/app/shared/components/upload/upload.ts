import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzUploadModule, NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzUploadModule, NzIconModule, NzButtonModule],
  template: `
    @if (listType() === 'picture-card') {
      <nz-upload
        [nzAction]="action()"
        [nzListType]="listType()"
        [nzFileList]="fileList()"
        [nzMultiple]="multiple()"
        [nzAccept]="accept()"
        [nzLimit]="limit()"
        [nzDisabled]="disabled()"
        [nzShowButton]="fileList().length < maxCount()"
        (nzChange)="onChange($event)"
      >
        <div>
          <nz-icon nzType="plus" />
          <div style="margin-top: 8px">Upload</div>
        </div>
      </nz-upload>
    } @else {
      <nz-upload
        [nzAction]="action()"
        [nzListType]="listType()"
        [nzFileList]="fileList()"
        [nzMultiple]="multiple()"
        [nzAccept]="accept()"
        [nzLimit]="limit()"
        [nzDisabled]="disabled()"
        (nzChange)="onChange($event)"
      >
        <button nz-button>
          <nz-icon nzType="upload" />
          Click to Upload
        </button>
      </nz-upload>
    }
  `,
})
export class Upload {
  readonly action = input('');
  readonly listType = input<'text' | 'picture' | 'picture-card'>('text');
  readonly fileList = input<NzUploadFile[]>([]);
  readonly multiple = input(false);
  readonly accept = input('');
  readonly limit = input(0);
  readonly disabled = input(false);
  readonly maxCount = input(5);
  readonly changed = output<NzUploadChangeParam>();

  onChange(event: NzUploadChangeParam): void {
    this.changed.emit(event);
  }
}

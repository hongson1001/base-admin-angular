import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { NzUploadModule, NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MessageService } from '@core/services/message.service';
import { DEFAULT_IMAGE_MAX_SIZE_MB, IMAGE_ACCEPT, validateFile } from '../upload/upload-utils';

@Component({
  selector: 'app-upload-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzUploadModule, NzIconModule],
  template: `
    <nz-upload
      nzListType="picture-card"
      [nzAction]="action()"
      [nzFileList]="fileList()"
      [nzMultiple]="multiple()"
      [nzAccept]="accept()"
      [nzDisabled]="disabled()"
      [nzShowButton]="fileList().length < maxCount()"
      [nzBeforeUpload]="beforeUpload"
      (nzChange)="onChange($event)"
    >
      <div>
        <nz-icon nzType="plus" />
        <div style="margin-top: 8px">{{ buttonText() }}</div>
      </div>
    </nz-upload>
  `,
})
export class UploadImage {
  private readonly message = inject(MessageService);

  readonly action = input('');
  readonly fileList = input<NzUploadFile[]>([]);
  readonly multiple = input(false);
  readonly accept = input(IMAGE_ACCEPT);
  readonly disabled = input(false);
  readonly maxCount = input(5);
  readonly maxSizeMB = input(DEFAULT_IMAGE_MAX_SIZE_MB);
  readonly buttonText = input('Tải ảnh');
  readonly changed = output<NzUploadChangeParam>();

  readonly beforeUpload = (file: NzUploadFile): boolean => {
    const result = validateFile(file, { accept: this.accept(), maxSizeMB: this.maxSizeMB() });
    if (!result.ok) {
      if (result.reason === 'type') {
        this.message.error('Chỉ chấp nhận file ảnh.');
      } else {
        this.message.error(`Ảnh vượt quá ${result.maxSizeMB}MB.`);
      }
      return false;
    }
    return true;
  };

  onChange(event: NzUploadChangeParam): void {
    this.changed.emit(event);
  }
}

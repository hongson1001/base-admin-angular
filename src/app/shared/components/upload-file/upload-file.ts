import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { NzUploadModule, NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MessageService } from '@core/services/message.service';
import {
  DEFAULT_FILE_MAX_SIZE_MB,
  FILE_ACCEPT_PRESETS,
  FileAcceptPreset,
  validateFile,
} from '../upload/upload-utils';

@Component({
  selector: 'app-upload-file',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzUploadModule, NzIconModule, NzButtonModule],
  template: `
    <nz-upload
      nzListType="text"
      [nzAction]="action()"
      [nzFileList]="fileList()"
      [nzMultiple]="multiple()"
      [nzAccept]="acceptAttr()"
      [nzDisabled]="disabled()"
      [nzShowButton]="fileList().length < maxCount()"
      [nzBeforeUpload]="beforeUpload"
      (nzChange)="onChange($event)"
    >
      <button nz-button [disabled]="disabled()">
        <nz-icon nzType="upload" />
        {{ buttonText() }}
      </button>
    </nz-upload>
  `,
})
export class UploadFile {
  private readonly message = inject(MessageService);

  readonly action = input('');
  readonly fileList = input<NzUploadFile[]>([]);
  readonly multiple = input(false);
  readonly preset = input<FileAcceptPreset>('all');
  readonly accept = input<string | null>(null);
  readonly disabled = input(false);
  readonly maxCount = input(5);
  readonly maxSizeMB = input(DEFAULT_FILE_MAX_SIZE_MB);
  readonly buttonText = input('Tải file');
  readonly changed = output<NzUploadChangeParam>();

  readonly acceptAttr = computed(() => this.accept() ?? FILE_ACCEPT_PRESETS[this.preset()]);

  readonly beforeUpload = (file: NzUploadFile): boolean => {
    const result = validateFile(file, { accept: this.acceptAttr(), maxSizeMB: this.maxSizeMB() });
    if (!result.ok) {
      if (result.reason === 'type') {
        this.message.error('Loại file không được hỗ trợ.');
      } else {
        this.message.error(`File vượt quá ${result.maxSizeMB}MB.`);
      }
      return false;
    }
    return true;
  };

  onChange(event: NzUploadChangeParam): void {
    this.changed.emit(event);
  }
}

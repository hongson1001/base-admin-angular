import { NzUploadFile } from 'ng-zorro-antd/upload';

export const DEFAULT_IMAGE_MAX_SIZE_MB = 5;
export const DEFAULT_FILE_MAX_SIZE_MB = 10;

export const IMAGE_ACCEPT = 'image/png,image/jpeg,image/jpg,image/gif,image/webp';

export const FILE_ACCEPT_PRESETS = {
  all: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv',
  pdf: '.pdf',
  excel: '.xls,.xlsx,.csv',
  word: '.doc,.docx',
  docs: '.pdf,.doc,.docx',
  ppt: '.ppt,.pptx',
} as const;

export type FileAcceptPreset = keyof typeof FILE_ACCEPT_PRESETS;

export interface ValidateFileOptions {
  accept?: string;
  maxSizeMB: number;
}

export type ValidateFileReason = 'type' | 'size';

export interface ValidateFileResult {
  ok: boolean;
  reason?: ValidateFileReason;
  maxSizeMB?: number;
}

export function validateFile(file: NzUploadFile, opts: ValidateFileOptions): ValidateFileResult {
  const { accept, maxSizeMB } = opts;

  if (accept) {
    const matchers = accept
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const name = (file.name ?? '').toLowerCase();
    const type = file.type ?? '';
    const matched = matchers.some((m) => {
      if (m.startsWith('.')) return name.endsWith(m.toLowerCase());
      if (type) return !!type.match(m);
      return false;
    });
    if (!matched) return { ok: false, reason: 'type' };
  }

  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size && file.size > maxBytes) {
    return { ok: false, reason: 'size', maxSizeMB };
  }

  return { ok: true };
}

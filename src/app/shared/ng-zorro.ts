/**
 * Barrel file re-exporting all ng-zorro modules used across the project.
 * Import from '@shared/ng-zorro' instead of individual ng-zorro packages.
 *
 * Usage in component:
 *   import { NzButtonModule, NzTableModule } from '@shared/ng-zorro';
 */

// General
export { NzButtonModule } from 'ng-zorro-antd/button';
export { NzIconModule } from 'ng-zorro-antd/icon';
export { NzDividerModule } from 'ng-zorro-antd/divider';

// Layout

// Navigation
export { NzPaginationModule } from 'ng-zorro-antd/pagination';
export { NzStepsModule } from 'ng-zorro-antd/steps';
export { NzTabsModule } from 'ng-zorro-antd/tabs';

// Data Entry
export { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
export { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
export { NzFormModule } from 'ng-zorro-antd/form';
export { NzInputModule } from 'ng-zorro-antd/input';
export { NzRadioModule } from 'ng-zorro-antd/radio';
export { NzSelectModule } from 'ng-zorro-antd/select';
export { NzSwitchModule } from 'ng-zorro-antd/switch';
export { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
export { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
export { NzUploadModule } from 'ng-zorro-antd/upload';

// Data Display
export { NzAvatarModule } from 'ng-zorro-antd/avatar';
export { NzBadgeModule } from 'ng-zorro-antd/badge';
export { NzCollapseModule } from 'ng-zorro-antd/collapse';
export { NzImageModule } from 'ng-zorro-antd/image';
export { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
export { NzTableModule } from 'ng-zorro-antd/table';
export { NzTagModule } from 'ng-zorro-antd/tag';
export { NzTooltipModule } from 'ng-zorro-antd/tooltip';

// Feedback
export { NzModalModule, NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
export { NzMessageService } from 'ng-zorro-antd/message';
export { NzNotificationService } from 'ng-zorro-antd/notification';

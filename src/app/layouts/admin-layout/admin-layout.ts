import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AbstractControl, ReactiveFormsModule, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthService } from '@core/services/auth.service';
import { MenuItem, MenuGroup, MENU_GROUPS } from '@core/constants/menu.config';
import { Avatar } from '@shared/components/avatar/avatar';
import { AppInput } from '@shared/components/input/input';

@Component({
  selector: 'app-admin-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzModalModule,
    NzFormModule,
    Avatar,
    AppInput,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private readonly authService = inject(AuthService);
  private readonly modal = inject(NzModalService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly isCollapsed = signal(false);
  readonly user = this.authService.user;
  readonly userName = computed(() => this.user()?.name ?? 'Admin');
  readonly userRole = computed(() => this.user()?.roles?.[0] ?? 'Admin');
  readonly showProfileModal = signal(false);
  readonly showPasswordModal = signal(false);

  readonly passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/)]],
    confirmPassword: ['', [Validators.required, this.matchPassword]],
  });

  private matchPassword(control: AbstractControl): ValidationErrors | null {
    const parent = control.parent;
    if (!parent) return null;
    const newPassword = parent.get('newPassword')?.value;
    return control.value === newPassword ? null : { passwordMismatch: true };
  }

  readonly menuGroups = computed(() =>
    MENU_GROUPS
      .map((group) => ({
        ...group,
        items: this.filterMenu(group.items),
      }))
      .filter((group) => group.items.length > 0),
  );

  private filterMenu(items: MenuItem[]): MenuItem[] {
    return items
      .filter((item) => !item.roles || this.authService.hasAnyRole(item.roles))
      .map((item) =>
        item.children
          ? { ...item, children: this.filterMenu(item.children) }
          : item,
      );
  }

  toggleCollapsed(): void {
    this.isCollapsed.update((v) => !v);
  }

  openProfile(): void {
    this.showProfileModal.set(true);
  }

  openChangePassword(): void {
    this.passwordForm.reset();
    this.showPasswordModal.set(true);
  }

  onChangePassword(): void {
    if (this.passwordForm.invalid) {
      Object.values(this.passwordForm.controls).forEach((c) => {
        c.markAsDirty();
        c.updateValueAndValidity();
      });
      return;
    }
    this.showPasswordModal.set(false);
  }

  confirmLogout(): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận đăng xuất',
      nzContent: 'Bạn có chắc chắn muốn đăng xuất?',
      nzOkText: 'Đăng xuất',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => this.authService.logout(),
    });
  }
}

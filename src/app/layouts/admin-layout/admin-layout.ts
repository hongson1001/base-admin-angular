import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthService } from '@core/services/auth.service';
import { MenuItem, MAIN_MENU, BOTTOM_MENU } from '@core/constants/menu.config';

@Component({
  selector: 'app-admin-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    RouterLink,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  private readonly authService = inject(AuthService);

  readonly isCollapsed = signal(false);
  readonly isDarkMode = signal(false);
  readonly user = this.authService.user;
  readonly userName = computed(() => this.user()?.name ?? 'Admin');

  readonly mainMenuItems = computed(() => this.filterMenu(MAIN_MENU));
  readonly bottomMenuItems = computed(() => this.filterMenu(BOTTOM_MENU));

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

  toggleDarkMode(): void {
    this.isDarkMode.update((v) => !v);
  }

  logout(): void {
    this.authService.logout();
  }
}

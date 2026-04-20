import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withXsrfConfiguration } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { AuthService } from '@core/services/auth.service';
import {
  DashboardOutline,
  UserOutline,
  SettingOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  LogoutOutline,
  LockOutline,
  TeamOutline,
  BellOutline,
  SearchOutline,
  DownOutline,
  ShoppingCartOutline,
  ShopOutline,
  EditOutline,
  MessageOutline,
  BulbOutline,
  ArrowUpOutline,
  ArrowDownOutline,
  GlobalOutline,
  AppstoreOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { errorInterceptor } from '@core/interceptors/error.interceptor';

registerLocaleData(vi);

const icons = [
  DashboardOutline,
  UserOutline,
  SettingOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  LogoutOutline,
  LockOutline,
  TeamOutline,
  BellOutline,
  SearchOutline,
  DownOutline,
  ShoppingCartOutline,
  ShopOutline,
  EditOutline,
  MessageOutline,
  BulbOutline,
  ArrowUpOutline,
  ArrowDownOutline,
  GlobalOutline,
  AppstoreOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiInterceptor, authInterceptor, errorInterceptor]),
      withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
    ),
    provideNzI18n(vi_VN),
    provideNzIcons(icons),
    provideAppInitializer(() => inject(AuthService).initialize()),
  ],
};

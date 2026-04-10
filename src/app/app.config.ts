import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { vi_VN, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
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
} from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

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
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, authInterceptor])),
    provideNzI18n(vi_VN),
    provideNzIcons(icons),
    provideEchartsCore({ echarts }),
  ],
};

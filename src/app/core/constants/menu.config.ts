import { Role } from '@core/enums/role.enum';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  roles?: Role[];
  children?: MenuItem[];
}

export const MAIN_MENU: MenuItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
  {
    label: 'Marketplace',
    icon: 'shop',
    roles: [Role.Admin, Role.Manager],
    children: [
      { label: 'Products', icon: 'shop', route: '/marketplace/products' },
      { label: 'Categories', icon: 'appstore', route: '/marketplace/categories', roles: [Role.Admin] },
    ],
  },
  { label: 'Orders', icon: 'shopping-cart', route: '/orders' },
  { label: 'Editing', icon: 'edit', route: '/editing', roles: [Role.Admin] },
  { label: 'Customers', icon: 'team', route: '/customers', roles: [Role.Admin, Role.Manager] },
  { label: 'Chat', icon: 'message', route: '/chat' },
];

export const BOTTOM_MENU: MenuItem[] = [
  { label: 'Settings', icon: 'setting', route: '/settings', roles: [Role.Admin] },
];

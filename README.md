# Base Angular Admin

Angular 21 admin dashboard template with ng-zorro-antd, Tailwind CSS, and ECharts.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 21.2.x | Framework |
| ng-zorro-antd | 21.2.1 | UI Components (Ant Design) |
| Tailwind CSS | 4.1.12 | Utility-first CSS |
| ECharts | 6.0 | Charts & Visualizations |
| RxJS | 7.8 | Reactive Programming |
| TypeScript | 5.9 | Language |
| Vitest | 4.0 | Testing |

## Getting Started

```bash
# Install dependencies
npm install

# Development server (http://localhost:4200)
ng serve

# Build
ng build                              # production
ng build --configuration staging      # staging
ng build --configuration development  # development

# Unit tests
ng test
```

## Project Structure

```
src/app/
├── core/                         # Singleton - chỉ dùng 1 lần cho app
│   ├── constants/
│   │   └── menu.config.ts        # Menu config (role-based)
│   ├── enums/
│   │   └── role.enum.ts          # Role enum (Admin, Manager, User)
│   ├── guards/
│   │   └── auth.guard.ts         # authGuard, guestGuard, roleGuard
│   ├── interceptors/
│   │   ├── api.interceptor.ts    # Auto-prefix API URL from environment
│   │   └── auth.interceptor.ts   # Bearer token + 401 auto-logout
│   └── services/
│       ├── auth.service.ts       # JWT decode, login/logout, roles
│       ├── message.service.ts    # Toast messages
│       ├── modal.service.ts      # Confirm/delete dialogs
│       └── notification.service.ts
│
├── shared/                       # Dùng chung cho mọi feature
│   ├── components/               # 25+ ng-zorro wrapper components
│   ├── pipes/                    # TruncatePipe, SafeHtmlPipe
│   ├── services/
│   │   └── api.service.ts        # HTTP client (GET, POST, PUT, PATCH, DELETE)
│   └── index.ts                  # Barrel exports
│
├── layouts/
│   └── admin-layout/             # Sidebar + content layout
│
├── features/                     # Lazy-loaded feature modules
│   ├── dashboard/                # Stats cards + charts
│   └── login/                    # Authentication page
│
├── app.config.ts                 # Providers, icons, i18n, interceptors
└── app.routes.ts                 # Route definitions

src/environments/
├── environment.ts                # Dev   (http://localhost:3000/api)
├── environment.staging.ts        # Stage (https://staging.your-domain.com/api)
└── environment.prod.ts           # Prod  (https://your-domain.com/api)
```

## Path Aliases

| Alias | Path |
|---|---|
| `@core/*` | `src/app/core/*` |
| `@shared/*` | `src/app/shared/*` |
| `@features/*` | `src/app/features/*` |
| `@layouts/*` | `src/app/layouts/*` |
| `@env/*` | `src/environments/*` |

## Authentication

### JWT Token Flow

```
Login -> API returns JWT -> localStorage -> AuthService decodes payload
                                         -> User signal updated
                                         -> Menu filtered by roles
```

**Expected JWT payload from backend:**

```json
{
  "sub": "user-id",
  "email": "admin@example.com",
  "name": "Admin",
  "roles": ["admin"],
  "exp": 1712700000
}
```

### Roles

| Role | Value | Description |
|---|---|---|
| `Role.Admin` | `admin` | Full access |
| `Role.Manager` | `manager` | Limited management access |
| `Role.User` | `user` | Basic access |

### Guards

```ts
// Requires authentication
canActivate: [authGuard]

// Blocks authenticated users (login page)
canActivate: [guestGuard]

// Requires specific role(s)
canActivate: [roleGuard(Role.Admin)]
canActivate: [roleGuard(Role.Admin, Role.Manager)]
```

## API Service

### Request Flow

```
ApiService -> apiInterceptor (base URL) -> authInterceptor (Bearer token) -> Server
```

### Usage

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly api = inject(ApiService);

  getUsers()                              { return this.api.get<User[]>('/users'); }
  getUser(id: string)                     { return this.api.get<User>(`/users/${id}`); }
  searchUsers(keyword: string, page: number) { return this.api.get<User[]>('/users', { keyword, page }); }
  createUser(data: CreateUserDto)         { return this.api.post<User>('/users', data); }
  updateUser(id: string, data: UpdateUserDto) { return this.api.patch<User>(`/users/${id}`, data); }
  deleteUser(id: string)                  { return this.api.delete(`/users/${id}`); }
}
```

## Menu Configuration

Menu defined in `src/app/core/constants/menu.config.ts`, auto-filtered by user roles.

```ts
// Visible to everyone (no roles specified)
{ label: 'Dashboard', icon: 'dashboard', route: '/dashboard' }

// Only Admin
{ label: 'Settings', icon: 'setting', route: '/settings', roles: [Role.Admin] }

// Submenu with children
{
  label: 'Marketplace',
  icon: 'shop',
  roles: [Role.Admin, Role.Manager],
  children: [
    { label: 'Products', icon: 'shop', route: '/marketplace/products' },
    { label: 'Categories', icon: 'appstore', route: '/marketplace/categories', roles: [Role.Admin] },
  ],
}
```

## Icons

Uses Ant Design Icons registered in `app.config.ts`.

**Adding a new icon:**
1. Import from `@ant-design/icons-angular/icons` (e.g. `PlusOutline`)
2. Add to `icons` array in `app.config.ts`
3. Use kebab-case in template: `PlusOutline` -> `plus`

**Available:** `dashboard`, `user`, `setting`, `menu-fold`, `menu-unfold`, `logout`, `lock`, `team`, `bell`, `search`, `down`, `shopping-cart`, `shop`, `edit`, `message`, `bulb`, `arrow-up`, `arrow-down`, `global`, `appstore`

## Shared Components

25+ reusable components wrapping ng-zorro:

| Category | Components |
|---|---|
| **Form** | Input, Button, Select, Checkbox, Radio, Switch, DatePicker, TimePicker, Upload, TreeSelect, Form |
| **Display** | Avatar, Badge, Tag, StatusTag, Table, Tabs, Steps, Divider, Image, QrCode, Tooltip, Collapse |
| **Feedback** | LoadingSpinner, EmptyState, PageHeader |

All components use `ChangeDetectionStrategy.OnPush` and signal-based APIs (`input()`, `output()`, `model()`).

## Adding a New Feature

**1. Create feature files:**

```
src/app/features/my-feature/
├── my-feature.ts
├── my-feature.html
├── my-feature.css
└── my-feature.routes.ts
```

**2. Define routes:**

```ts
// my-feature.routes.ts
import { Routes } from '@angular/router';
import { MyFeature } from './my-feature';

const routes: Routes = [{ path: '', component: MyFeature }];
export default routes;
```

**3. Register in `app.routes.ts`:**

```ts
{
  path: 'my-feature',
  canActivate: [roleGuard(Role.Admin)],
  loadChildren: () => import('@features/my-feature/my-feature.routes'),
}
```

**4. Add menu item in `menu.config.ts`:**

```ts
{ label: 'My Feature', icon: 'appstore', route: '/my-feature', roles: [Role.Admin] }
```

## Environment Configuration

| Environment | API URL | Command |
|---|---|---|
| Development | `http://localhost:3000/api` | `ng serve` |
| Staging | `https://staging.your-domain.com/api` | `ng build --configuration staging` |
| Production | `https://your-domain.com/api` | `ng build` |

Import from the same path everywhere:

```ts
import { environment } from '@env/environment';
```

Angular swaps the file automatically based on build configuration via `fileReplacements` in `angular.json`.

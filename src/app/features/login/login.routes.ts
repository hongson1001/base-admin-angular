import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./login').then((m) => m.Login),
  },
];

export default routes;

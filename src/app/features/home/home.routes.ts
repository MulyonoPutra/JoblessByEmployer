import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(
        (c) => c.HomeComponent,
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then(
        (c) => c.AboutComponent,
      ),
  },
];

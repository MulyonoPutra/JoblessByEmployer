import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main/main.component').then((c) => c.MainComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home/home.component').then((c) => c.HomeComponent),
      }
    ]
  }
];

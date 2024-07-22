import { Routes } from "@angular/router";

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'details',
    loadComponent: () =>
      import('./acount-details/account-details.component').then((c) => c.AccountDetailsComponent),
  }
]

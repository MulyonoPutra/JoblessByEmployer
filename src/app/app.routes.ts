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
                    import('./features/home/pages/home/home.component').then(
                        (c) => c.HomeComponent,
                    ),
            },
            {
                path: 'account',
                loadChildren: () =>
                    import('./features/account/pages/acount.routes').then((c) => c.ACCOUNT_ROUTES),
            },
            {
                path: 'jobs',
                loadChildren: () => import('./features/jobs/job.routes').then((c) => c.JOB_ROUTES),
            },
            {
                path: 'contact',
                loadComponent: () =>
                    import('./features/contact/contact-us/contact-us.component').then(
                        (c) => c.ContactUsComponent,
                    ),
            },
        ],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/authentication/authentication.routes').then((c) => c.AUTH_ROUTES),
    },
];

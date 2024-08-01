import { PageNotFoundComponent } from './core/layout/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guards/authentication.guard';
import { authorizationGuard } from './core/guards/authorization.guard';

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
                // canActivate: [authorizationGuard],
                // data: {role: 'employer' },
            },
            {
                path: 'account',
                loadChildren: () =>
                    import('./features/account/pages/acount.routes').then((c) => c.ACCOUNT_ROUTES),
                canActivate: [authorizationGuard],
                data: { role: 'employer' },
            },
            {
                path: 'jobs',
                loadChildren: () => import('./features/jobs/job.routes').then((c) => c.JOB_ROUTES),
                canActivate: [authorizationGuard],
                data: { role: 'employer' },
            },
            {
                path: 'contact',
                loadComponent: () =>
                    import('./features/contact/contact-us/contact-us.component').then(
                        (c) => c.ContactUsComponent,
                    ),
                canActivate: [authorizationGuard],
                data: { role: 'employer' },
            },
        ],
    canActivate: [authenticationGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/authentication/authentication.routes').then((c) => c.AUTH_ROUTES),
    },
    { path: '**', component: PageNotFoundComponent },
];

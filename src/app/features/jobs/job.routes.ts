import { Routes } from '@angular/router';

export const JOB_ROUTES: Routes = [
    {
        path: 'create',
        loadComponent: () =>
            import('./pages/create-job-ads/create-job-ads.component').then(
                (c) => c.CreateJobAdsComponent,
            ),
    },
    {
        path: 'manage',
        loadComponent: () =>
            import('./pages/manage-job-ads/manage-job-ads.component').then(
                (c) => c.ManageJobAdsComponent,
            ),
    },
];

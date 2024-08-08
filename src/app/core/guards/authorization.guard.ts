import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { ToastService } from '../../shared/services/toast.service';

export const authorizationGuard: CanActivateFn = (route) => {
    const storageService: StorageService = inject(StorageService);
    const toastService: ToastService = inject(ToastService);
    const router: Router = inject(Router);
    const token = storageService.getAccessToken();
    const role = storageService.getRole();

    if (token) {
        if (route.data['role'] && route.data['role'].indexOf(role) === -1) {
            toastService.showWarnToast(
                'You are not allowed!',
                'Login or Register using Employer account to access this page.',
            );
            router.navigate(['/']);

            return false;
        }
    } else {
        router.navigate(['/login']);
        return false;
    }
    return true;
};

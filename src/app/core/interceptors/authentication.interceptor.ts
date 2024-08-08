/* eslint-disable @typescript-eslint/no-explicit-any */

import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import {
    HttpErrorResponse,
    HttpInterceptorFn,
    HttpRequest,
    HttpStatusCode,
} from '@angular/common/http';

import { AuthenticationService } from '../services/authentication.service';
import { Credentials } from '../domain/entities/credentials';
import { HttpResponseEntity } from '../domain/entities/http-response-entity';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { ToastService } from '../../shared/services/toast.service';
import { inject } from '@angular/core';

export const authenticationInterceptor: HttpInterceptorFn = (request, next) => {
    const storageService: StorageService = inject(StorageService);
    const authService: AuthenticationService = inject(AuthenticationService);
    const toastService: ToastService = inject(ToastService);
    const router: Router = inject(Router);
    let isRefreshing = false;
    const refreshTokenSubject = new BehaviorSubject<any>(null);

    const authPaths = ['/auth/refresh', '/auth/login', '/auth/register'];

    const addAuthHeader = (request: HttpRequest<unknown>) => {
        const accessToken = storageService.getAccessToken();
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };

    const handle401Unauthorized = (request: HttpRequest<unknown>) => {
        if (!isRefreshing) {
            isRefreshing = true;
            refreshTokenSubject.next(null);

            const refreshToken = storageService.getRefreshToken();
            if (refreshToken) {
                return authService.generateRefreshToken(refreshToken).pipe(
                    switchMap((newToken: HttpResponseEntity<Credentials>) => {
                        console.log('Refreshing refresh token');
                        isRefreshing = false;
                        setCredentials(newToken);

                        refreshTokenSubject.next(newToken.data.accessToken);
                        request = addAuthHeader(request);

                        return next(request);
                    }),
                    catchError((error: HttpErrorResponse) => {
                        isRefreshing = false;
                        handleTokenExpired();
                        return throwError(() => error.message);
                    }),
                );
            }
        }
        return refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap(() => {
                request = addAuthHeader(request);
                return next(request);
            }),
        );
    };

    const handleTokenExpired = () => {
        toastService.showWarnToast('Warning!', 'Refresh token is expired, please login again.');

        storageService.clear();
        router.navigate(['/auth/login']);
    };

    const setCredentials = (newToken: HttpResponseEntity<Credentials>) => {
        storageService.setAccessToken(newToken.data.accessToken);
        storageService.setRefreshToken(newToken.data.refreshToken);
    };

    if (authPaths.some((path) => request.url.toLowerCase().includes(path))) {
        return next(request);
    }

    const token = storageService.getAccessToken();

    if (token) {
        request = addAuthHeader(request);
    }

    return next(request).pipe(
        catchError((error) => {
            if (
                error instanceof HttpErrorResponse &&
                error.status === HttpStatusCode.Unauthorized
            ) {
                return handle401Unauthorized(request);
            }
            const errors = error.error.message || error.statusText;
            return throwError(() => errors);
        }),
    );
};

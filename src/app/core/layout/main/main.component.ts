import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { FooterComponent } from '../../../shared/components/molecules/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/molecules/navbar/navbar.component';
import { ProfileService } from '../../services/profile.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ToastService } from '../../../shared/services/toast.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../../domain/entities/user';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
    template: `
        <div class="flex flex-col h-screen justify-between">
            <app-navbar [user]="user" (logout)="logout()" />
            <main>
                <div
                    [ngClass]="{
                        'max-w-[55rem]': !isFullWidthRoute,
                        'max-w-[85rem]': isFullWidthRoute,
                    }"
                    class="mx-auto pt-4 pb-10 px-4 sm:px-6 lg:px-8 md:pt-2">
                    <router-outlet></router-outlet>
                </div>
            </main>
            <app-footer></app-footer>
        </div>
    `,
    styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    user!: User;
    private currentRoute!: string;
    private fullWidthRoutes: string[] = ['/', '/account/details', '/jobs/manage', '/about'];

    constructor(
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly profileService: ProfileService,
        private readonly storageService: StorageService,
        private readonly authService: AuthenticationService,
        private readonly toastService: ToastService,
    ) {
        this.trackRouteChanges();
    }

    ngOnInit(): void {
        this.findUser();
    }

    trackRouteChanges(): void {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentRoute = event.urlAfterRedirects;
            }
        });
    }

    get isFullWidthRoute(): boolean {
        return this.fullWidthRoutes.includes(this.currentRoute);
    }

    findUser(): void {
        this.profileService
            .findUser()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (user: User) => {
                    this.user = user;
                    if (this.user.employer) {
                        this.storageService.setEmployerIdentity(this.user.employer.id);
                    } else {
                        this.toastService.showWarnToast(
                            'Warning',
                            'Employer information is not available.',
                        );
                    }
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
            });
    }

    logout(): void {
        const token = this.storageService.getAccessToken();
        this.authService.logout(token).subscribe({
            next: () => {
                this.toastService.showSuccessToast('Success', 'Logout Successfully!');
            },
            error: (error: HttpErrorResponse) => {
                this.toastService.showErrorToast('Error', error.message);
            },
            complete: () => {
                this.router.navigateByUrl('/auth/login').then(() => window.location.reload());
            },
        });
    }
}

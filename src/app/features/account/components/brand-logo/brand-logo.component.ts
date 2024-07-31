import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, Input, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { EmployerService } from '../../../../core/services/employer.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from '../../../../core/domain/entities/company';

@Component({
    selector: 'app-brand-logo',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './brand-logo.component.html',
    styleUrls: ['./brand-logo.component.scss'],
})
export class BrandLogoComponent implements OnInit {
    @Input() companyId!: string;
    @Input() company!: Company;

    form!: FormGroup;

    logo: string | null = null;
    header: string | null = null;

    emptyLogo = 'https://preline.co/assets/img/160x160/img1.jpg';
    emptyHeader = 'https://preline.co/assets/svg/examples/abstract-bg-1.svg';

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly validationService: ValidationService,
        private readonly toastService: ToastService,
        private readonly employerService: EmployerService,
    ) {}

    ngOnInit(): void {
        this.initForm();
        console.log(this.company);
    }

    initForm(): void {
        this.form = this.fb.group({
            logo: [null, Validators.required],
            header: [null, Validators.required],
        });
    }

    triggerFileInput(): void {
        const logo = document.getElementById('logo') as HTMLInputElement;
        logo.click();
    }

    triggerHeaderInput(): void {
        const header = document.getElementById('header') as HTMLInputElement;
        header.click();
    }

    onChangeFile(event: Event, type: string): void {
        const inputElement = event.target as HTMLInputElement;

        if (inputElement.files && inputElement.files[0]) {
            const file = inputElement.files[0];

            if (!this.validationService.isValidImageType(file)) {
                this.toastService.showErrorToast(
                    'Error',
                    'Only JPG, PNG, and WebP image formats are allowed.',
                );
                return;
            }

            if (!this.validationService.isValidFileSize(file)) {
                this.toastService.showErrorToast('Error', 'Image size exceeds the limit of 5 MB.');
                return;
            }

            if (type === 'logo') {
                this.logo = URL.createObjectURL(file);
                this.form.patchValue({ logo: file });
            } else if (type === 'header') {
                this.header = URL.createObjectURL(file);
                this.form.patchValue({ header: file });
            }
        }
    }

    saveChanges(): void {
        if (this.form.valid) {
            const logoFile = this.form.get('logo')?.value;
            const headerFile = this.form.get('header')?.value;

            console.log(headerFile);
            console.log(logoFile);

            if (logoFile) {
                this.uploadLogoToServer(logoFile);
            }

            if (headerFile) {
                this.uploadHeaderToServer(headerFile);
            }
        } else {
            this.toastService.showErrorToast('Error', 'Please upload valid files.');
        }
    }

    removeFile(type: string): void {
        if (type === 'logo') {
            this.logo = null;
        } else if (type === 'header') {
            this.header = null;
        }
    }

    uploadHeaderToServer(file: File) {
        const formData = new FormData();
        formData.append('header', file);

        this.employerService
            .uploadHeader(this.companyId, formData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'successfully change header!');
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    uploadLogoToServer(file: File) {
        const formData = new FormData();
        formData.append('logo', file);

        this.employerService
            .uploadLogo(this.companyId, formData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'successfully change logo!');
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    navigateAfterSucceed(): void {
        timer(2000)
            .pipe(take(1))
            .subscribe(() =>
                this.router.navigateByUrl('/account/details').then(() => window.location.reload()),
            );
    }
}

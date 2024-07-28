import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { timer, take } from 'rxjs';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { FormPasswordFieldComponent } from '../../../../shared/components/atoms/form-password-field/form-password-field.component';
import { LogoComponent } from '../../../../shared/components/atoms/logo/logo.component';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        FormInputFieldComponent,
        FormPasswordFieldComponent,
        LogoComponent,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly authService: AuthenticationService,
        private readonly validationService: ValidationService,
        private readonly toastService: ToastService,
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    get formCtrlValue() {
        return {
            email: this.form.get('email')?.value,
            password: this.form.get('password')?.value,
        };
    }

    login(): void {
        this.authService
            .login(this.formCtrlValue)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Login Successfully!');
                    this.setLoading();
                },
                error: (error: HttpErrorResponse) => {
                    this.setLoading();
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {
                    this.navigateAfterSucceed();
                },
            });
    }

    private setLoading() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }

    navigateAfterSucceed(): void {
        timer(2000)
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/'));
    }

    onSubmit() {
        this.isLoading = true;
        if (this.form.valid) {
            this.login();
        } else {
            this.validationService.markAllFormControlsAsTouched(this.form);
        }
    }
}

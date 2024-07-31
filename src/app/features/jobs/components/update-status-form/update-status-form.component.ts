import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { take, timer } from 'rxjs';
import { JobAdService } from '../../../../core/services/job-ad.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';

@Component({
    selector: 'app-update-status-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonComponent,
        FormInputFieldComponent,
    ],
    templateUrl: './update-status-form.component.html',
    styleUrls: ['./update-status-form.component.scss'],
    providers: [JobAdService],
})
export class UpdateStatusFormComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
    jobAdsId!: string;

    constructor(
        private readonly router: Router,
        private readonly fb: FormBuilder,
        private readonly toastService: ToastService,
        private readonly jobAdService: JobAdService,
        private readonly dialogConfig: DynamicDialogConfig,
        private readonly destroyRef: DestroyRef,
    ) {
        this.jobAdsId = this.dialogConfig.data?.id;
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.form = this.fb.group({
            status: ['', Validators.required],
        });
    }

    get formCtrlValue() {
        return {
            status: this.form.get('status')?.value,
        };
    }

    private setLoading() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }

    navigateAfterSucceed(): void {
        timer(2000)
            .pipe(take(1))
            .subscribe(() =>
                this.router.navigateByUrl('/jobs/manage').then(() => window.location.reload()),
            );
    }

    saveChanges() {
        this.isLoading = true;
        if (this.form.valid) {
            this.onSave();
        }
    }

    onSave(): void {
        this.jobAdService
            .updateJobAdStatus(this.jobAdsId, this.formCtrlValue)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    this.toastService.showSuccessToast('Success', 'Updated Successfully!');
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
}

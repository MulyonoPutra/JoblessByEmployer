import { Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { take, timer } from 'rxjs';

import { CommonModule } from '@angular/common';
import { EmployerService } from '../../../../core/services/employer.service';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { UpdateAccountNameDto } from '../../../../core/domain/dto/update-account-name.dto';
import { ValidationService } from '../../../../shared/services/validation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'account-detail-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputFieldComponent],
    templateUrl: './account-detail-form.component.html',
    styleUrls: ['./account-detail-form.component.scss'],
})
export class AccountDetailFormComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;



    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly validationService: ValidationService,
        private readonly toastService: ToastService,
        private readonly employerService: EmployerService
    ) {}

    @Output() clicked = new EventEmitter();

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            accountName: ['', Validators.required],
        });
    }

    get formCtrlValue(): UpdateAccountNameDto {
        return {
            accountName: this.form.get('accountName')?.value,
        };
    }

    onClicked(): void {
        this.clicked.emit();
    }

    saveChanges(): void {
      if(this.form.valid){
        this.onCreate();
      }
    }

    onCreate(): void {
      this.employerService.updateAccountName(this.formCtrlValue)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toastService.showSuccessToast('Success', 'Created Account!')
          },
          error: (error: HttpErrorResponse) => {
            this.toastService.showErrorToast('Error', error.message);
          },
          complete: () => {
            this.navigateAfterSucceed();
          },
        })
    }

    private setLoading() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }



    navigateAfterSucceed(): void {
        timer(2000)
            .pipe(take(1))
          .subscribe(() => this.router.navigateByUrl('/account/details').then(() => window.location.reload())
        );
    }
}

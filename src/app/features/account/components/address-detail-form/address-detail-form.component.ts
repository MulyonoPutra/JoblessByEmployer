import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { Router } from '@angular/router';
import { timer, take } from 'rxjs';
import { Company } from '../../../../core/domain/entities/company';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { CreateAddressDto } from '../../../../core/domain/dto/create-address.dto';
import { Employer } from '../../../../core/domain/entities/employer';
import { EmployerService } from '../../../../core/services/employer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-address-detail-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputFieldComponent],
    templateUrl: './address-detail-form.component.html',
    styleUrls: ['./address-detail-form.component.scss'],
})
export class AddressDetailFormComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
    @Input() companyId!: string;

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
        this.initForm();
    }

    initForm() {
        this.form = this.formBuilder.group({
            street: ['', Validators.required],
            province: ['', Validators.required],
            regency: ['', Validators.required],
            district: ['', Validators.required],
            village: ['', Validators.required],
            postCode: ['', Validators.required],
        });
    }

    get formCtrlValue(): CreateAddressDto {
        return {
            street: this.form.get('street')?.value,
            province: this.form.get('province')?.value,
            regency: this.form.get('regency')?.value,
            district: this.form.get('district')?.value,
            village: this.form.get('village')?.value,
            postCode: this.form.get('postCode')?.value,
        };
    }

    onClicked(): void {
        this.clicked.emit();
    }

    saveChanges(): void {
      if(this.form.valid) {
        this.onSubmit();
      }
    }

    onSubmit(): void {
      this.employerService.createAddress(this.companyId, this.formCtrlValue)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toastService.showSuccessToast('Success', 'successfully Create Address!');
          },
          error: (error: HttpErrorResponse) => {
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
}

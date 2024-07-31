import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take, timer } from 'rxjs';
import { Company } from '../../../../core/domain/entities/company';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { NumberFieldComponent } from '../../../../shared/components/atoms/number-field/number-field.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EmployerService } from '../../../../core/services/employer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
    selector: 'app-company-detail-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormInputFieldComponent,
        NumberFieldComponent,
        AngularSvgIconModule,
    ],
    templateUrl: './company-detail-form.component.html',
    styleUrls: ['./company-detail-form.component.scss'],
})
export class CompanyDetailFormComponent implements OnInit {
    form!: FormGroup;
    isLoading = false;

    @Input() companyId!: string;
    @Input() company!: Company;

    employerId!: string;

    logo!: string;
    header!: string;
    emptyLogo = 'https://preline.co/assets/img/160x160/img1.jpg';
    emptyHeader = 'https://preline.co/assets/svg/examples/abstract-bg-1.svg';

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly validationService: ValidationService,
        private readonly toastService: ToastService,
        private readonly employerService: EmployerService,
        private readonly storageService: StorageService,
    ) {
        this.employerId = storageService.getEmployerIdentity();
    }

    @Output() clicked = new EventEmitter();

    ngOnInit(): void {
        this.initForm();
        if (this.company) {
            this.prepopulateForms(this.company);
        }
    }

    initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            website: ['', Validators.required],
            industry: ['', Validators.required],
            size: ['', Validators.required],
            location: ['', Validators.required],
            description: ['', Validators.required],
            benefit: ['', Validators.required],
            contactInfo: ['', Validators.required],
        });
    }

    get formCtrlValue(): Company {
        return {
            name: this.form.get('name')?.value,
            website: this.form.get('website')?.value,
            industry: this.form.get('industry')?.value,
            size: this.form.get('size')?.value,
            location: this.form.get('location')?.value,
            description: this.form.get('description')?.value,
            benefit: this.form.get('benefit')?.value,
            contactInfo: this.form.get('contactInfo')?.value,
        };
    }

    protected prepopulateForms(data: Company): void {
        this.form.patchValue({
            name: data.name,
            website: data.website,
            industry: data.industry,
            size: data.size,
            location: data.location,
            description: data.description,
            benefit: data.benefit,
            contactInfo: data.contactInfo,
        });
        this.logo = data.logo!;
        this.header = data.header!;
    }

    onClicked(): void {
        this.clicked.emit();
    }

    saveChanges(): void {
        if (this.form.valid) {
            this.onSave();
        }
    }

    onSave(): void {
        this.employerService
            .createCompany(this.employerId, this.formCtrlValue)
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

    navigateAfterSucceed(): void {
        timer(2000)
            .pipe(take(1))
            .subscribe(() =>
                this.router.navigateByUrl('/account/details').then(() => window.location.reload()),
            );
    }
}

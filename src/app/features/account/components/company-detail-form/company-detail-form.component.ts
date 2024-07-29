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
    isLoading: boolean = false;

    @Input() companyId!: string

  imgBase64!: string;

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
            name: ['', Validators.required],
            logo: ['', Validators.required],
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
            logo: this.form.get('logo')?.value,
            website: this.form.get('website')?.value,
            industry: this.form.get('industry')?.value,
            size: this.form.get('size')?.value,
            location: this.form.get('location')?.value,
            description: this.form.get('description')?.value,
            benefit: this.form.get('benefit')?.value,
            contactInfo: this.form.get('contactInfo')?.value,
        };
    }

    onClicked(): void {
        this.clicked.emit();
    }

    saveChanges(): void {}

    private setLoading() {
        setTimeout(() => {
            this.isLoading = false;
        }, 2000);
    }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onChangeFile(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];

      if (!this.validationService.isValidImageType(file)) {
        this.toastService.showErrorToast('Error', 'Only JPG, PNG, and WebP image formats are allowed.');
        return;
      }

      if (!this.validationService.isValidFileSize(file)) {
        this.toastService.showErrorToast('Error', 'Image size exceeds the limit of 5 MB.');
        return;
      }

      this.imgBase64 = URL.createObjectURL(file);
      this.uploadImageToServer(file);
    }
  }

  uploadImageToServer(file: File) {
    const formData = new FormData();
    formData.append('logo', file);

    this.employerService.uploadLogo(this.companyId, formData).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        console.log(error);

        this.toastService.showErrorToast('Error', error.message);
      },
      complete: () => {
        this.toastService.showSuccessToast('Success', 'successfully change logo!')
        this.navigateAfterSucceed();
      },
    });
  }

  navigateAfterSucceed(): void {
    timer(2000)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/account/details').then(() => window.location.reload())
      );
  }
}

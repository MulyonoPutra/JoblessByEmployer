import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Output, type OnInit } from '@angular/core';
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

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly validationService: ValidationService,
        private readonly toastService: ToastService,
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

    navigateAfterSucceed(): void {
        timer(2000)
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/'));
    }
}

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
import { Router } from '@angular/router';
import { CreateAccountDto } from '../../../../core/domain/dto/create-name.dto';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationService } from '../../../../shared/services/validation.service';

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
    ) {}

    @Output() clicked = new EventEmitter();

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            accountName: ['', Validators.required],
        });
    }

    get formCtrlValue(): CreateAccountDto {
        return {
            accountName: this.form.get('accountName')?.value,
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

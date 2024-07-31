import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, type OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ReferenceDto } from '../../../../core/domain/dto/reference.dto';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';

@Component({
    selector: 'app-manage-candidate',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormInputFieldComponent],
    templateUrl: './manage-candidate.component.html',
    styleUrls: ['./manage-candidate.component.scss'],
})
export class ManageCandidateComponent implements OnInit {
    form!: FormGroup;
    isLoading = false;
    @Output() reference = new EventEmitter<ReferenceDto>();
    constructor(private readonly formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formInit();
        this.detectValueChanges();
    }

    formInit(): void {
        this.form = this.formBuilder.group({
            reference: ['', Validators.required],
        });
    }

    get formCtrlValue(): ReferenceDto {
        return {
            reference: this.form.get('reference')?.value,
        };
    }

    detectValueChanges(): void {
        this.form?.valueChanges.pipe(debounceTime(2000)).subscribe({
            next: (value) => {
                if (value) {
                    this.reference.emit(value);
                }
            },
        });
    }
}

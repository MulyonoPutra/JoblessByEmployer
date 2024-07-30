import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, type OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { FormInputFieldComponent } from '../../../../shared/components/atoms/form-input-field/form-input-field.component';
import { debounceTime } from 'rxjs';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NumberFieldComponent } from '../../../../shared/components/atoms/number-field/number-field.component';
import { ClassifyDto } from '../../../../core/domain/dto/classify.dto';

type CheckboxType = {
    name: string;
    key: string;
};

@Component({
    selector: 'app-classify-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RadioButtonModule,
        FormInputFieldComponent,
        NumberFieldComponent,
    ],
    templateUrl: './classify-form.component.html',
    styleUrls: ['./classify-form.component.scss'],
})
export class ClassifyFormComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
    @Output() classify = new EventEmitter<ClassifyDto>();

    workTypes: CheckboxType[] = [
        { name: 'Full-Time', key: 'FT' },
        { name: 'Part-Time', key: 'PT' },
        { name: 'Contract', key: 'CR' },
        { name: 'Casual', key: 'CS' },
    ];

    payTypes: CheckboxType[] = [
        { name: 'Hourly Rate', key: 'HR' },
        { name: 'Monthly Salary', key: 'MS' },
        { name: 'Annual Salary', key: 'AS' },
        { name: 'Annual Plus Commission', key: 'AP' },
    ];

    constructor(private readonly formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formInit();
        this.detectValueChanges();
    }

    formInit(): void {
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            salary: ['', Validators.required],
            location: ['', Validators.required],
            workType: ['', Validators.required],
            payType: ['', Validators.required],
        });
    }

    detectValueChanges(): void {
        this.form?.valueChanges.pipe(debounceTime(2000)).subscribe({
            next: (value) => {
                if (value) {
                    const updatedValue = {
                        ...value,
                        salary: value.salary?.toString() || '',
                    };
                    this.classify.emit(updatedValue);
                }
            },
        });
    }
}

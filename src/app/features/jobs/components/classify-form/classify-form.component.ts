import { CommonModule } from "@angular/common";
import { Component, DestroyRef, EventEmitter, Output, type OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastService } from "../../../../shared/services/toast.service";
import { ValidationService } from "../../../../shared/services/validation.service";
import { FormInputFieldComponent } from "../../../../shared/components/atoms/form-input-field/form-input-field.component";

@Component({
  selector: 'app-classify-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormInputFieldComponent,
  ],
  templateUrl: './classify-form.component.html',
  styleUrls: ['./classify-form.component.scss'],
})
export class ClassifyFormComponent implements OnInit {

  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly validationService: ValidationService,
    private readonly toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  get formCtrlValue() {
    return {
      title: this.form.get('title')?.value,
    };
  }

  onSave(): void {

  }

}

import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output, type OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { debounceTime } from "rxjs";
import { ClassifyDto } from "../../../../core/domain/dto/classify.dto";
import { JobDescDto } from "../../../../core/domain/dto/job-desc.dto";
import { EditorComponent } from "../../../../shared/components/atoms/editor/editor.component";

@Component({
  selector: 'app-job-description-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorComponent
  ],
  templateUrl: './job-description-form.component.html',
  styleUrls: ['./job-description-form.component.scss'],
})
export class JobDescriptionFormComponent implements OnInit {

  form!: FormGroup;
  isLoading: boolean = false;
  @Output() jobDesc = new EventEmitter<JobDescDto>();
  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.detectValueChanges();
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      requirements: ['', Validators.required],
    });
  }

  get formCtrlValue(): JobDescDto {
    return {
      description: this.form.get('description')?.value,
      requirements: this.form.get('requirements')?.value,
    };
  }

  detectValueChanges(): void {
    this.form?.valueChanges
      .pipe(debounceTime(2000))
      .subscribe({
        next: (value) => {
          if (value) {
            this.jobDesc.emit(value);
          }
        }
      });
  }
}

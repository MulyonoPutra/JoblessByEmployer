import { Component, DestroyRef } from '@angular/core';

import { AngularSvgIconModule } from "angular-svg-icon";
import { ClassifyDto } from "../../../../core/domain/dto/classify.dto";
import { ClassifyFormComponent } from "../../components/classify-form/classify-form.component";
import { CommonModule } from "@angular/common";
import { CreateJobAdsDto } from "../../../../core/domain/dto/create-job-ads.dto";
import { HttpErrorResponse } from "@angular/common/http";
import { JobAdService } from "../../../../core/services/job-ad.service";
import { JobDescDto } from "../../../../core/domain/dto/job-desc.dto";
import { JobDescriptionFormComponent } from "../../components/job-description-form/job-description-form.component";
import { Router } from "@angular/router";
import { TableModule } from 'primeng/table';
import { ToastService } from "../../../../shared/services/toast.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
@Component({
  selector: 'app-create-job-ads',
  standalone: true,
  imports: [
    CommonModule, TableModule, AngularSvgIconModule, ClassifyFormComponent, JobDescriptionFormComponent
  ],
  templateUrl: './create-job-ads.component.html',
  styleUrls: ['./create-job-ads.component.scss'],
})
export class CreateJobAdsComponent {

  createJobAds!: CreateJobAdsDto;
  classifyDto!: ClassifyDto;
  jobDescDto!: JobDescDto;

  constructor(
    private readonly jobAdService: JobAdService,
    private readonly toastService: ToastService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
  ) { }

  onSubmit() {
    this.createJobAds = { ...this.classifyDto, ...this.jobDescDto };
    this.jobAdService.createJobAd(this.createJobAds)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.showSuccessToast('Success', 'Created Job Ads Successfully!');
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showErrorToast('Error', error.message);
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      });
  }

  classifyData(data: ClassifyDto) {
    this.classifyDto = data;
  }

  jobDescData(data: JobDescDto) {
    this.jobDescDto = data;
  }

}

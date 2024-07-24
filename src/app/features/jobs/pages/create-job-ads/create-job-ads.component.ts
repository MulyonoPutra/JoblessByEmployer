import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClassifyFormComponent } from "../../components/classify-form/classify-form.component";
import { AngularSvgIconModule } from "angular-svg-icon";
import { CreateJobAdsDto } from "../../../../core/domain/dto/create-job-ads.dto";
import { ClassifyDto } from "../../../../core/domain/dto/classify.dto";
import { JobDescriptionFormComponent } from "../../components/job-description-form/job-description-form.component";
@Component({
  selector: 'app-create-job-ads',
  standalone: true,
  imports: [
    CommonModule, TableModule, AngularSvgIconModule, ClassifyFormComponent, JobDescriptionFormComponent
  ],
  templateUrl: './create-job-ads.component.html',
  styleUrls: ['./create-job-ads.component.scss'],
})
export class CreateJobAdsComponent implements OnInit {

  createJobAds!: CreateJobAdsDto;
  title!: string;
  ngOnInit() {}


  onSubmit() {

  }

  classifyData(data: ClassifyDto) {
    console.log('received data');
    console.log(data);

  }

}

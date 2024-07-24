import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClassifyFormComponent } from "../../components/classify-form/classify-form.component";
import { AngularSvgIconModule } from "angular-svg-icon";
@Component({
  selector: 'app-create-job-ads',
  standalone: true,
  imports: [
    CommonModule, TableModule, AngularSvgIconModule, ClassifyFormComponent
  ],
  templateUrl: './create-job-ads.component.html',
  styleUrls: ['./create-job-ads.component.scss'],
})
export class CreateJobAdsComponent implements OnInit {

  ngOnInit() {}

  passData() {
    console.log('name: Mulyono');

    return {
      name: 'Mulyono Putra'
    }
  }

}

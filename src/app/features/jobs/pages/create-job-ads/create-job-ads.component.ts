import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-create-job-ads',
  standalone: true,
  imports: [
    CommonModule, TableModule
  ],
  templateUrl: './create-job-ads.component.html',
  styleUrls: ['./create-job-ads.component.scss'],
})
export class CreateJobAdsComponent implements OnInit {

  ngOnInit() {}
  
}

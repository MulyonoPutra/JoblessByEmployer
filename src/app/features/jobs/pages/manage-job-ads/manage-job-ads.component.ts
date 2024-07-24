import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-job-ads',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './manage-job-ads.component.html',
  styleUrls: ['./manage-job-ads.component.scss'],
})
export class ManageJobAdsComponent implements OnInit {

  ngOnInit(): void { }

}

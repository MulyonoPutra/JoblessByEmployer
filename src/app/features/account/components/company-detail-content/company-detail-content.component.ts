import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-company-detail-content',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './company-detail-content.component.html',
  styleUrls: ['./company-detail-content.component.scss'],
})
export class CompanyDetailContentComponent implements OnInit {

  ngOnInit(): void { }

}

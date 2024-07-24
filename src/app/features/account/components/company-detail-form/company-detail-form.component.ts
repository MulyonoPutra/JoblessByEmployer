import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-company-detail-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './company-detail-form.component.html',
  styleUrls: ['./company-detail-form.component.scss'],
})
export class CompanyDetailFormComponent implements OnInit {

  ngOnInit(): void { }

}

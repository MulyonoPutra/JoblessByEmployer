import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'account-detail-content',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './account-detail-content.component.html',
  styleUrls: ['./account-detail-content.component.scss'],
})
export class AccountDetailContentComponent implements OnInit {

  ngOnInit(): void { }

}

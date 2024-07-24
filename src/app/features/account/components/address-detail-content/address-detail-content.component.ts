import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-address-detail-content',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './address-detail-content.component.html',
  styleUrls: ['./address-detail-content.component.scss'],
})
export class AddressDetailContentComponent implements OnInit {

  ngOnInit(): void { }

}

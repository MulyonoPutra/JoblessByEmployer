import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-address-detail-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './address-detail-form.component.html',
  styleUrls: ['./address-detail-form.component.scss'],
})
export class AddressDetailFormComponent implements OnInit {

  ngOnInit(): void { }

}

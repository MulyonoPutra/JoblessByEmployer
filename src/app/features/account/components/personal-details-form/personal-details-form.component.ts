import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-details-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss'],
})
export class PersonalDetailsFormComponent implements OnInit {

  ngOnInit(): void { }

}

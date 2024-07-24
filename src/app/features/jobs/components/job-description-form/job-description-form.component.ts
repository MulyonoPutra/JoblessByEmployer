import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-job-description-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './job-description-form.component.html',
  styleUrls: ['./job-description-form.component.scss'],
})
export class JobDescriptionFormComponent implements OnInit {

  ngOnInit(): void { }

}

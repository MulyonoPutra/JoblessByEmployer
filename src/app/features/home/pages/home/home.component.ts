import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from "angular-svg-icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  ngOnInit(): void { }

}

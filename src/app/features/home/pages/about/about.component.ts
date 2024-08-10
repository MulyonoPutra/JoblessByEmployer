import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  templateUrl: './about.component.html',
  styleUrls: [ './about.component.scss' ],
})
export class AboutComponent { }

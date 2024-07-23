import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  ngOnInit(): void { }

}

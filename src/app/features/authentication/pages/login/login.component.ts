import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private readonly router: Router){}

  ngOnInit(): void { }

  login(){
    this.router.navigate(['/']);
  }

}

import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { ToastService } from "../../../../shared/services/toast.service";

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

  constructor(
    private readonly router: Router,
    private readonly toastService: ToastService
  ){}

  ngOnInit(): void { }

  login(){
    this.toastService.showSuccessToast('Success', 'Login Success')
    this.router.navigate(['/']);
  }

}

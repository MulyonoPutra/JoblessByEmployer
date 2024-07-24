import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { ToastService } from "../../../../shared/services/toast.service";

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

  constructor(
    private readonly router: Router,
    private readonly toastService: ToastService
  ) { }

  ngOnInit(): void { }

  register() {
    this.toastService.showSuccessToast('Success', 'Login Success')
    this.router.navigate(['/']);
  }

}

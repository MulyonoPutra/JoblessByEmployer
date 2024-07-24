import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from "@angular/common";

@Component({
  selector: 'account-detail-form',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './account-detail-form.component.html',
  styleUrls: ['./account-detail-form.component.scss'],
})
export class AccountDetailFormComponent {

  @Output() clicked = new EventEmitter();

  onClicked(): void {
    this.clicked.emit();
  }

}

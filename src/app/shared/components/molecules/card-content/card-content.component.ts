import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent implements OnInit {

  @Input() title!: string;
  @Input() subtitle!: string;
  @Output() clicked = new EventEmitter();

  onClicked(): void {
    this.clicked.emit();
  }

  ngOnInit(): void { }

}

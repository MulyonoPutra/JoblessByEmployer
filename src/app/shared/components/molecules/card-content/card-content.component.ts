import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card-content',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-content.component.html',
    styleUrls: ['./card-content.component.scss'],
})
export class CardContentComponent {
    @Input() title!: string;
    @Input() subtitle!: string;
    @Output() clicked = new EventEmitter();

    onClicked(): void {
        this.clicked.emit();
    }
}

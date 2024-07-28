import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab-navs',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './tab-navs.component.html',
    styleUrls: ['./tab-navs.component.scss'],
})
export class TabNavsComponent {
    @Output() clicked = new EventEmitter<string>();
    @Input() title!: string;
    @Input() subtitle!: string;
    @Input() icon!: string;
    @Input() activeTab!: string;
    @Input() existTab!: string;

    setActiveTab(existTab: string) {
        this.clicked.emit(existTab);
    }

    get svgIcons() {
        return `../../../../../assets/icons/${this.icon}.svg`;
    }
}

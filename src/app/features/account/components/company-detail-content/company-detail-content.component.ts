import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { Company } from '../../../../core/domain/entities/company';
import { SkeletonLoaderComponent } from '../../../../shared/components/atoms/skeleton-loader/skeleton-loader.component';

@Component({
    selector: 'app-company-detail-content',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, SkeletonLoaderComponent],
    templateUrl: './company-detail-content.component.html',
    styleUrls: ['./company-detail-content.component.scss'],
})
export class CompanyDetailContentComponent {
    isCompany = false;
    @Input() company!: Company;
    @Output() clicked = new EventEmitter();

    onClicked(): void {
        this.clicked.emit();
    }
}

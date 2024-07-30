import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardContentComponent } from '../../../../shared/components/molecules/card-content/card-content.component';
import { CommonModule } from '@angular/common';
import { Company } from '../../../../core/domain/entities/company';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/atoms/skeleton-loader/skeleton-loader.component';

@Component({
    selector: 'app-company-detail-content',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, SkeletonLoaderComponent, EmptyStateComponent, CardContentComponent],
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

    toggle(): void {
      
    }
}

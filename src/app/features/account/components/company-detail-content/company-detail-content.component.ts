import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SkeletonLoaderComponent } from '../../../../shared/components/atoms/skeleton-loader/skeleton-loader.component';
import { Company } from '../../../../core/domain/entities/company';

@Component({
    selector: 'app-company-detail-content',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, SkeletonLoaderComponent],
    templateUrl: './company-detail-content.component.html',
    styleUrls: ['./company-detail-content.component.scss'],
})
export class CompanyDetailContentComponent implements OnInit {
    isCompany = false;
    @Input() company!: Company;
    @Output() clicked = new EventEmitter();

    ngOnInit(): void {}

    onClicked(): void {
        this.clicked.emit();
    }
}

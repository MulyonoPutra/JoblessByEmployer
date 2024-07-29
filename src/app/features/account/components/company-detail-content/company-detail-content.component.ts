import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SkeletonLoaderComponent } from '../../../../shared/components/atoms/skeleton-loader/skeleton-loader.component';
import { Company } from '../../../../core/domain/entities/company';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployerService } from '../../../../core/services/employer.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationService } from '../../../../shared/services/validation.service';
import { timer, take } from 'rxjs';

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

    constructor(
        private readonly router: Router,
        private readonly destroyRef: DestroyRef,
        private readonly validationService: ValidationService,
        private readonly toastService: ToastService,
        private readonly employerService: EmployerService,
    ) {}

    ngOnInit(): void {}

    onClicked(): void {
        this.clicked.emit();
    }
}

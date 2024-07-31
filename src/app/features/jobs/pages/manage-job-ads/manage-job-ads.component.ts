import { CommonModule } from '@angular/common';
import { Component, DestroyRef, type OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/molecules/table/table.component';
import { Router } from '@angular/router';
import { JobAdService } from '../../../../core/services/job-ad.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobAds } from '../../../../core/domain/entities/job-ads';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
    selector: 'app-manage-job-ads',
    standalone: true,
    imports: [CommonModule, TableComponent],
    templateUrl: './manage-job-ads.component.html',
    styleUrls: ['./manage-job-ads.component.scss'],
})
export class ManageJobAdsComponent implements OnInit {
    employerId!: string;

    constructor(
        private readonly router: Router,
        private readonly toastService: ToastService,
        private readonly destroyRef: DestroyRef,
        private readonly jobAdService: JobAdService,
        private readonly storageService: StorageService,
    ) {
        this.employerId = this.storageService.getEmployerIdentity();
    }

    data!: JobAds[];
    filterFields: string[] = [];
    columns!: any[];

    ngOnInit() {
        this.findJobAdsByEmployerId('open');
    }

    sendStatus(status: string) {
        this.findJobAdsByEmployerId(status);
    }

    findJobAdsByEmployerId(status: string): void {
        this.jobAdService
            .findJobAdsByEmployerId(this.employerId, status)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (data: JobAds[]) => {
                    this.data = data;
                    this.setColumns();
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {},
            });
    }

    private setColumns() {
        const hideFields = [
            'description',
            'requirements',
            'employer',
            'createdAt',
            'updatedAt',
            'status',
        ];
        if (this.data.length > 0) {
            this.columns = Object.keys(this.data[0])
                .filter((key) => !hideFields.includes(key))
                .map((key) => ({
                    field: key,
                    header: this.toHeader(key),
                }));
            this.filterFields = this.columns.map((column) => column.field);
        }
    }

    toHeader(key: string): string {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    }

    onCreate() {
        this.router.navigate(['/jobs/create']);
    }

    onEdit() {
        console.log('onEdit');
    }

    onDelete() {
        console.log('onDeleted');
    }
}

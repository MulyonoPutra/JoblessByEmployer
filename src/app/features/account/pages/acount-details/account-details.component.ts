import { Component, DestroyRef, OnInit, inject } from '@angular/core';

import { AccountDetailContentComponent } from '../../components/acount-detail-content/account-detail-content.component';
import { AccountDetailFormComponent } from '../../components/account-detail-form/account-detail-form.component';
import { Address } from '../../../../core/domain/entities/address';
import { AddressDetailContentComponent } from '../../components/address-detail-content/address-detail-content.component';
import { AddressDetailFormComponent } from '../../components/address-detail-form/address-detail-form.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BrandLogoComponent } from '../../components/brand-logo/brand-logo.component';
import { CardContentComponent } from '../../../../shared/components/molecules/card-content/card-content.component';
import { CommonModule } from '@angular/common';
import { Company } from '../../../../core/domain/entities/company';
import { CompanyDetailContentComponent } from '../../components/company-detail-content/company-detail-content.component';
import { CompanyDetailFormComponent } from '../../components/company-detail-form/company-detail-form.component';
import { Employer } from '../../../../core/domain/entities/employer';
import { EmployerService } from '../../../../core/services/employer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IncompleteSections } from '../../../../core/constants/incomplete-section';
import { NavTabs } from '../../../../core/domain/entities/nav-tabs';
import { Router } from '@angular/router';
import { StorageService } from '../../../../shared/services/storage.service';
import { TabNavsComponent } from '../../../../shared/components/molecules/tab-navs/tab-navs.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { UpdateAccountNameDto } from '../../../../core/domain/dto/update-account-name.dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CompleteMessage {
    title: string;
    subtitle: string;
}

@Component({
    selector: 'app-account-details',
    standalone: true,
    imports: [
        CommonModule,
        AngularSvgIconModule,
        TabNavsComponent,
        CardContentComponent,
        AccountDetailContentComponent,
        AccountDetailFormComponent,
        CompanyDetailContentComponent,
        CompanyDetailFormComponent,
        AddressDetailContentComponent,
        AddressDetailFormComponent,
        BrandLogoComponent,
    ],
    templateUrl: './account-details.component.html',
    styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
    private readonly router: Router = inject(Router);
    private readonly employerService: EmployerService = inject(EmployerService);
    private readonly storageService: StorageService = inject(StorageService);
    private readonly toastService: ToastService = inject(ToastService);
    private readonly destroyRef: DestroyRef = inject(DestroyRef);

    employer!: Employer;
    company!: Company;
    address!: Address;
    accountNameDto!: UpdateAccountNameDto;

    isAccount!: boolean;
    isCompany!: boolean;
    isAddress!: boolean;

    companyName!: string;

    // Dev purpose
    accountId = '50030354-581d-46f4-8bc6-b61dc11605a4';
    addressId = '50030354-581d-46f4-8bc6-b61dc11605a4';
    companyId!: string;

    incompleteSections: NavTabs[] = IncompleteSections;
    activeTab: string = 'tabs-with-card-item-1';

    ngOnInit(): void {
        this.findEmployer();
    }

    get isComplete(): boolean {
        return !!(this.accountId && this.addressId && this.companyId);
    }

    findEmployer(): void {
        const employerId = this.storageService.getEmployerIdentity();
        this.employerService
            .findEmployer(employerId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (employer: Employer) => {
                    this.employer = employer;
                    this.isAccount = this.employer.accountName === null;
                    this.isCompany = (this.employer.company && this.employer.company.id) === null;
                    this.isAddress =
                        (this.employer.company.address && this.employer.company.address.id) ===
                        null;

                    this.company = employer.company;
                    console.log(this.company);

                    this.address = employer.company.address!;
                    this.companyId = employer.company.id!;

                    this.companyName = employer.company.name;
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast('Error', error.message);
                },
                complete: () => {},
            });
    }

    setActiveTab(tabId: string) {
        this.activeTab = tabId;
    }

    completeConditions(item: NavTabs): boolean | string | undefined {
        const account = this.accountId && item.tab === 'tabs-with-card-item-1';
        const company = this.companyId && item.tab === 'tabs-with-card-item-2';
        const address = this.addressId && item.tab === 'tabs-with-card-item-3';
        return account || address || company;
    }

    toggleUpdate(type: 'account' | 'company' | 'address') {
        switch (type) {
            case 'account':
                this.isAccount = !this.isAccount;
                break;
            case 'company':
                this.isCompany = !this.isCompany;
                break;
            case 'address':
                this.isAddress = !this.isAddress;
                break;
        }
    }

    navigate(routes: string): void {
        this.router.navigateByUrl(`/account/${routes}`);
    }
}

// https://preline.co/examples/application-form-layouts.html

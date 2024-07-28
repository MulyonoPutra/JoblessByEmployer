import { Component, DestroyRef, inject } from '@angular/core';

import { AccountDetailContentComponent } from '../../components/acount-detail-content/account-detail-content.component';
import { AccountDetailFormComponent } from '../../components/account-detail-form/account-detail-form.component';
import { AddressDetailContentComponent } from '../../components/address-detail-content/address-detail-content.component';
import { AddressDetailFormComponent } from '../../components/address-detail-form/address-detail-form.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CardContentComponent } from '../../../../shared/components/molecules/card-content/card-content.component';
import { CommonModule } from '@angular/common';
import { CompanyDetailContentComponent } from '../../components/company-detail-content/company-detail-content.component';
import { CompanyDetailFormComponent } from '../../components/company-detail-form/company-detail-form.component';
import { EmployerService } from '../../../../core/services/employer.service';
import { IncompleteSections } from '../../../../core/constants/incomplete-section';
import { NavTabs } from '../../../../core/domain/entities/nav-tabs';
import { Router } from '@angular/router';
import { TabNavsComponent } from '../../../../shared/components/molecules/tab-navs/tab-navs.component';

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
    ],
    templateUrl: './account-details.component.html',
    styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent {
    private readonly router: Router = inject(Router);
    private readonly employerService: EmployerService = inject(EmployerService);
    private readonly destroyRef: DestroyRef = inject(DestroyRef);

    isAccount = false;
    isCompany = false;
    isAddress = false;

    // Dev purpose
    accountId = '50030354-581d-46f4-8bc6-b61dc11605a4';
    addressId = '50030354-581d-46f4-8bc6-b61dc11605a4';
    companyId = 'a';

    incompleteSections: NavTabs[] = IncompleteSections;
    activeTab: string = 'tabs-with-card-item-1';

    get isComplete(): boolean {
        return !!(this.accountId && this.addressId && this.companyId);
    }

    findEmployer(): void {}

    setActiveTab(tabId: string) {
        this.activeTab = tabId;
    }

    completeConditions(item: NavTabs): boolean | string | undefined {
        const account = this.accountId && item.tab === 'tabs-with-card-item-1';
        const company = this.companyId && item.tab === 'tabs-with-card-item-2';
        const address = this.addressId && item.tab === 'tabs-with-card-item-3';
        return account || address || company;
    }

    completeMessage(item: NavTabs): CompleteMessage | null {
        const account = this.accountId && item.tab === 'tabs-with-card-item-1';
        const company = this.companyId && item.tab === 'tabs-with-card-item-2';
        const address = this.addressId && item.tab === 'tabs-with-card-item-3';
        if (account) {
            return {
                title: 'Account Information Updated',
                subtitle: 'Please provide the remaining details to finalize your profile.',
            };
        } else if (company) {
            return {
                title: 'Company Information Updated',
                subtitle: 'Complete the remaining sections to finish your profile.',
            };
        } else if (address) {
            return {
                title: 'Address Information Updated',
                subtitle: 'Fill in any additional details to complete your profile.',
            };
        }
        return null;
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

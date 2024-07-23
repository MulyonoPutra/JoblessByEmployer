import { Component, inject } from '@angular/core';

import { AngularSvgIconModule } from "angular-svg-icon";
import { CommonModule } from "@angular/common";
import { IncompleteSections } from "../../../../core/constants/incomplete-section";
import { NavTabs } from "../../../../core/domain/entities/nav-tabs";
import { PersonalDetailsFormComponent } from '../../components/personal-details-form/personal-details-form.component';
import { Router } from "@angular/router";
import { TabNavsComponent } from "../../../../shared/components/molecules/tab-navs/tab-navs.component";

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
    PersonalDetailsFormComponent
  ],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent {

  router: Router = inject(Router);

  isAccount: boolean = false;

  // Dev purpose
  accountId = '50030354-581d-46f4-8bc6-b61dc11605a4';
  addressId = '50030354-581d-46f4-8bc6-b61dc11605a4';
  companyId = 's';

  incompleteSections: NavTabs[] = IncompleteSections;
  activeTab: string = 'tabs-with-card-item-1';

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  get isComplete(): boolean {
    return !!(this.accountId && this.addressId && this.companyId);
  }

  completeConditions(item: NavTabs): boolean | string | undefined {
    const account = (this.accountId && item.tab === 'tabs-with-card-item-1')
    const company = (this.companyId && item.tab === 'tabs-with-card-item-2')
    const address = (this.addressId && item.tab === 'tabs-with-card-item-3')
    return account || address || company;
  }

  completeMessage(item: NavTabs): CompleteMessage | null {
    const account = (this.accountId && item.tab === 'tabs-with-card-item-1');
    const company = (this.companyId && item.tab === 'tabs-with-card-item-2');
    const address = (this.addressId && item.tab === 'tabs-with-card-item-3');
    if (account) {
      return {
        title: 'Account Information Updated',
        subtitle: 'Please provide the remaining details to finalize your profile.'
      };
    } else if (company) {
      return {
        title: 'Company Information Updated',
        subtitle: 'Complete the remaining sections to finish your profile.'
      };
    } else if (address) {
      return {
        title: 'Address Information Updated',
        subtitle: 'Fill in any additional details to complete your profile.'
      };
    }
    return null;
  }

  isUpdateAccount() {
    this.isAccount = !this.isAccount;
  }


  navigate(routes: string): void {
    this.router.navigateByUrl(`/account/${routes}`);
  }

}

// https://preline.co/examples/application-form-layouts.html

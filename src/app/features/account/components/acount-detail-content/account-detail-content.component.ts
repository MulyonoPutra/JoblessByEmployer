import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Employer } from '../../../../core/domain/entities/employer';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';

@Component({
    selector: 'app-account-detail-content',
    standalone: true,
    imports: [CommonModule, EmptyStateComponent],
    templateUrl: './account-detail-content.component.html',
    styleUrls: ['./account-detail-content.component.scss'],
})
export class AccountDetailContentComponent {
    @Input() employer!: Employer;
}

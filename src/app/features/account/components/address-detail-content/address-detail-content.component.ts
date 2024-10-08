import { Component, Input } from '@angular/core';

import { Address } from '../../../../core/domain/entities/address';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';

@Component({
    selector: 'app-address-detail-content',
    standalone: true,
    imports: [CommonModule, EmptyStateComponent],
    templateUrl: './address-detail-content.component.html',
    styleUrls: ['./address-detail-content.component.scss'],
})
export class AddressDetailContentComponent {
    @Input() address!: Address;
    @Input() companyName!: string;
}

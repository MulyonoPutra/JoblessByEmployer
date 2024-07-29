import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { Address } from '../../../../core/domain/entities/address';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';

@Component({
    selector: 'app-address-detail-content',
    standalone: true,
    imports: [CommonModule, EmptyStateComponent],
    templateUrl: './address-detail-content.component.html',
    styleUrls: ['./address-detail-content.component.scss'],
})
export class AddressDetailContentComponent implements OnInit {
    @Input() address!: Address;
    @Input() companyName!: string;

    ngOnInit(): void {}
}

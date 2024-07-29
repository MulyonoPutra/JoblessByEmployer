import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { EmptyStateComponent } from '../../../../shared/components/atoms/empty-state/empty-state.component';
import { Employer } from '../../../../core/domain/entities/employer';

@Component({
    selector: 'account-detail-content',
    standalone: true,
    imports: [CommonModule, EmptyStateComponent],
    templateUrl: './account-detail-content.component.html',
    styleUrls: ['./account-detail-content.component.scss'],
})
export class AccountDetailContentComponent implements OnInit {

  @Input() employer!: Employer

    ngOnInit(): void {}
}

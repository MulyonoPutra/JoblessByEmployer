import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { StorageService } from '../../../services/storage.service';
import { User } from '../../../../core/domain/entities/user';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, AngularSvgIconModule, LogoComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    private readonly storageService: StorageService = inject(StorageService);
    private readonly router: Router = inject(Router);

    @Input() user!: User;

    @Output() logout = new EventEmitter();

    signOut(): void {
      this.logout.emit();
    }

    get employerId(): string {
        return this.storageService.getEmployerIdentity();
    }

    navigate() {
        if (this.user.employer.accountName == null) {
            this.router.navigate(['/account/details']);
        } else {
            this.router.navigate(['/jobs/create']);
        }
    }
}

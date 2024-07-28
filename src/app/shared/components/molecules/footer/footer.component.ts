import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, LogoComponent],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}

import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-contact-us',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
    ngOnInit(): void {}
}

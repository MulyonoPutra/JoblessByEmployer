import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-completion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile-completion.component.html',
    styleUrls: ['./profile-completion.component.scss'],
})
export class ProfileCompletionComponent implements OnInit {
    ngOnInit(): void {}
}

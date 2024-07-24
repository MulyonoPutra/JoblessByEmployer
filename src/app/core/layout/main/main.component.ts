import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { FooterComponent } from '../../../shared/components/molecules/footer/footer.component';
import { NavbarComponent } from '../../../shared/components/molecules/navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, NavbarComponent, FooterComponent
  ],
  template: `
    <app-navbar></app-navbar>
    		<main>
			<div
				[ngClass]="{
					'max-w-[55rem]': !isFullWidthRoute,
					'max-w-[85rem]': isFullWidthRoute,
				}"
				class="mx-auto pt-4 pb-10 px-4 sm:px-6 lg:px-8 md:pt-2">
				<router-outlet></router-outlet>
			</div>
		</main>
    <app-footer></app-footer>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  private currentRoute!: string;
  private fullWidthRoutes: string[] = ['/', '/account/details', '/jobs/manage'];

  constructor(
    private readonly router: Router,
  ) {
    this.trackRouteChanges();
  }

  ngOnInit(): void { }

  trackRouteChanges(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  get isFullWidthRoute(): boolean {
    return this.fullWidthRoutes.includes(this.currentRoute);
  }

}

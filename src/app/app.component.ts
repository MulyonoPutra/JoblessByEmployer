import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { take, timer } from 'rxjs';

import { IStaticMethods } from 'preline/preline';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'jobless-by-employer';
  loadingIndicator!: boolean;

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
    this.showSpinner();
  }

  ngOnInit() {
    this.prelineInit();
    this.scrollToTop();
  }

  prelineInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
  }

  scrollToTop() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

  showSpinner(): void {
    this.router.events.subscribe((routeEvent) => {
      if (routeEvent instanceof NavigationStart) {
        this.loadingIndicator = true;
      }

      if (routeEvent instanceof NavigationEnd) {
        this.delay();
      }

      if (
        routeEvent instanceof NavigationEnd ||
        routeEvent instanceof NavigationError ||
        routeEvent instanceof NavigationCancel
      ) {
        this.delay();
      }
    });
  }

  delay(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() => {
        this.loadingIndicator = false;
      });
  }
}

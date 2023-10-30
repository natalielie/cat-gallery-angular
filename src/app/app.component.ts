import { Component, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'cat-gallery';
  unsubscribe: Subject<void> = new Subject<void>();
  loading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {
    //  Subscribe to router events and handle them
    this.router.events
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((routerEvent) => {
        this.checkRouterEvent(routerEvent as RouterEvent);
      });
  }

  /** Handle router events and update the loading state accordingly. */
  checkRouterEvent(routerEvent: RouterEvent): void {
    // When a navigation starts, set the loading flag to true
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    // When a navigation ends, is canceled, or encounters an error, set the loading flag to false

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    this.unsubscribe.next();
  }
}

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

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}

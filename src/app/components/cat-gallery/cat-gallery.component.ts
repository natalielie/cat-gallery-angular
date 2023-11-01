import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import { selectImageData } from 'src/app/store/selectors/cat-gallery.selectors';
import { CatGalleryState } from 'src/app/store/reducers/cat-gallery-images.reducers';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

/**
 * A component for displaying loaded images
 */
@Component({
  selector: 'app-cat-gallery',
  templateUrl: './cat-gallery.component.html',
  styleUrls: ['./cat-gallery.component.scss'],
})
export class CatGalleryComponent implements OnInit, OnDestroy {
  /** The number of images to load at first */
  readonly defaultCount = 10;
  /** image data from the store */
  imagesData$ = this.store.select(selectImageData);
  /** a spinner for loading */
  showImages = false;
  /** a subject for preventing memory leak */
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<CatGalleryState>,
    private spinner: NgxSpinnerService
  ) {}

  /**
   * The first loading of the images
   */
  ngOnInit(): void {
    this.store.dispatch(
      CatGalleryActions.getImages({
        limit: this.defaultCount,
      })
    );
    !this.imagesData$.subscribe((value) => {
      if (value.pending) {
        this.spinner.show();
        this.showImages = false;
      } else {
        this.spinner.hide();
        this.showImages = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}

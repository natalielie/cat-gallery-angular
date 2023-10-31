import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import { selectImageData } from 'src/app/store/selectors/cat-gallery.selectors';
import { CatGalleryState } from 'src/app/store/reducers/cat-gallery-images.reducers';

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

  constructor(private store: Store<CatGalleryState>) {}

  /**
   * The first loading of the images
   */
  ngOnInit(): void {
    this.store.dispatch(
      CatGalleryActions.getImages({
        limit: this.defaultCount,
      })
    );
  }

  ngOnDestroy(): void {}
}

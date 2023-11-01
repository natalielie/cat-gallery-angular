import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectImageData } from 'src/app/store/selectors/cat-gallery.selectors';
import { CatGalleryState } from 'src/app/store/reducers/cat-gallery-images.reducers';
import { Subject, merge, of } from 'rxjs';
import { ICatImage } from 'src/app/interfaces/cat.interface';

/**
 * A component for displaying loaded images
 */
@Component({
  selector: 'app-cat-gallery',
  templateUrl: './cat-gallery.component.html',
  styleUrls: ['./cat-gallery.component.scss'],
})
export class CatGalleryComponent implements OnInit, OnDestroy {
  @Input() imagesPerPage!: ICatImage[];

  /** image data from the store */
  imagesData$ = this.store.select(selectImageData);

  /** a subject for preventing memory leak */
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(private store: Store<CatGalleryState>) {}

  /**
   * The first loading of the images
   */
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }
}

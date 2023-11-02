import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectImageData } from 'src/app/store/selectors/cat-gallery.selectors';
import { CatGalleryState } from 'src/app/store/reducers/cat-gallery-images.reducers';
import { Subject } from 'rxjs';
import { ICatImage } from 'src/app/interfaces/cat.interface';

/**
 * A component for displaying loaded images
 */
@Component({
  selector: 'app-cat-gallery',
  templateUrl: './cat-gallery.component.html',
  styleUrls: ['./cat-gallery.component.scss'],
})
export class CatGalleryComponent {
  @Input() imagesPerPage!: ICatImage[];

  imagesData$ = this.store.select(selectImageData);

  constructor(private store: Store<CatGalleryState>) {}
}

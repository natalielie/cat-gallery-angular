import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import {
  selectFilters,
  selectImageData,
} from 'src/app/store/selectors/cat-gallery.selectors';
import { tap } from 'rxjs';
import { CatGalleryState } from 'src/app/store/reducers/cat-gallery-images.reducers';

@Component({
  selector: 'app-cat-gallery',
  templateUrl: './cat-gallery.component.html',
  styleUrls: ['./cat-gallery.component.scss'],
})
export class CatGalleryComponent {
  defualtQuantity: number = 10;

  imagesData$ = this.store.select(selectImageData);
  filters$ = this.store.select(selectFilters);

  constructor(private store: Store<CatGalleryState>) {}
}

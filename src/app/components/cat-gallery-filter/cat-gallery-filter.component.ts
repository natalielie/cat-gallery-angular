import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { IBreed } from 'src/app/interfaces/cat.interface';
import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import {
  ImageFilter,
  CatGalleryState,
} from 'src/app/store/reducers/cat-gallery-images.reducers';

/**
 * A component for displaying and processing the filtering
 */
@Component({
  selector: 'app-cat-gallery-filter',
  templateUrl: './cat-gallery-filter.component.html',
  styleUrls: ['./cat-gallery-filter.component.scss'],
})
export class CatGalleryFilterComponent implements OnInit, OnDestroy {
  /** options of numbers of images to display at once */
  readonly quantityCount = [1, 5, 10, 20, 50, 100];
  /** list of all breeds in the db */
  breedList!: IBreed[];
  /** form with default optins chosen */
  readonly filtersForm: FormGroup = this.formBuilder.group({
    breeds: { value: ['all'], disabled: false },
    quantity: this.formBuilder.control(10),
    hasBreed: true,
  });
  /** a subject for preventing memory leak */
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<CatGalleryState>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    // preloading breedlist
    this.breedList = this.route.snapshot.data['breeds'];
  }

  /**
   * Dispatching changing the filter values
   */
  ngOnInit(): void {
    this.filtersForm.valueChanges.subscribe(() => {
      const filterFormValue = this.filtersForm.getRawValue();
      const filter = {
        ...filterFormValue,
        breeds: filterFormValue.breeds ?? [],
      };
      this.store.dispatch(CatGalleryActions.changeFilter({ filter }));
      this.loadFilteredImages(filter);
    });
  }

  /**
   * preventing memory leak
   */
  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  /**
   * Dispatching loading images after changing the filter values
   *
   * @param filter FilterImage (breeds and quantity) for filtering
   *
   */
  loadFilteredImages(filter: ImageFilter): void {
    this.store.dispatch(
      CatGalleryActions.getFilteredImages({
        filter,
      })
    );
  }
}

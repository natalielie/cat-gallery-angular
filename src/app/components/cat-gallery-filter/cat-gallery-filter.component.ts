import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { IBreed, ICatImage } from 'src/app/interfaces/cat.interface';
import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import {
  ImageFilter,
  CatGalleryState,
} from 'src/app/store/reducers/cat-gallery-images.reducers';
import { selectImageData } from 'src/app/store/selectors/cat-gallery.selectors';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';

/**
 * A component for displaying and processing the filtering
 */
@Component({
  selector: 'app-cat-gallery-filter',
  templateUrl: './cat-gallery-filter.component.html',
  styleUrls: ['./cat-gallery-filter.component.scss'],
})
export class CatGalleryFilterComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
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

  /** image data from the store */
  readonly imagesData$ = this.store.select(selectImageData);
  imagesLength!: number;
  page = 0;
  pageSize = 10;
  imagesPerPage!: ICatImage[];
  allImages!: ICatImage[];
  /** a spinner for loading */
  showImages = false;
  /** The number of images to load at first */
  readonly defaultCount = 10;

  constructor(
    private store: Store<CatGalleryState>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    // preloading breedlist
    this.breedList = this.route.snapshot.data['breeds'];
  }

  /**
   * Dispatching changing the filter values
   */
  ngOnInit(): void {
    // first load
    this.store.dispatch(
      CatGalleryActions.getImages({
        quantity: this.defaultCount,
      })
    );

    //subscribing to filter changes
    this.filtersForm.valueChanges.subscribe(() => {
      const filterFormValue = this.filtersForm.getRawValue();
      const filter = {
        ...filterFormValue,
        breeds: filterFormValue.breeds ?? [],
      };
      this.loadFilteredImages(filter);
      this.store.dispatch(CatGalleryActions.changeFilter({ filter }));
    });

    // subscriving to set of images changes
    !this.imagesData$.subscribe((value) => {
      if (value.pending) {
        this.spinner.show();
        this.showImages = false;
      } else {
        this.spinner.hide();
        this.showImages = true;
      }
      this.imagesLength = value.images.length;
      this.allImages = value.images;
      // getting data for pagination
      this.getDataForPagination({
        pageIndex: this.page,
        pageSize: this.pageSize,
      });
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

  /**
   * getting data for pagination
   *
   * @param pagination page index and page size we get
   * from a user to manage pagination
   */
  getDataForPagination(pagination: { pageIndex: number; pageSize: number }) {
    let index = 0,
      startingIndex = pagination.pageIndex * pagination.pageSize,
      endingIndex = startingIndex + pagination.pageSize;
    this.imagesPerPage = this.allImages.filter(() => {
      index++;
      return index > startingIndex && index <= endingIndex ? true : false;
    });
  }
}

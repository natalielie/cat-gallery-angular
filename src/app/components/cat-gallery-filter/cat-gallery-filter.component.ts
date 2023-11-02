import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import {
  IBreed,
  ICatImage,
  ImageFilter,
} from 'src/app/interfaces/cat.interface';
import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import { CatGalleryState } from 'src/app/store/reducers/cat-gallery-images.reducers';
import { selectImageData } from 'src/app/store/selectors/cat-gallery.selectors';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { defaultCount, quantityCount } from 'src/app/constants/constants';

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

  breedList!: IBreed[];

  readonly filtersForm: FormGroup = this.formBuilder.group({
    breeds: new FormControl<string[]>({ value: ['all'], disabled: false }),
    quantity: new FormControl<number>(10),
    hasBreed: new FormControl<boolean>(true),
  });

  private unsubscribe: Subject<void> = new Subject<void>();

  readonly imagesData$ = this.store.select(selectImageData);
  imagesLength!: number;
  page = 0;
  pageSize = 10;
  imagesPerPage!: ICatImage[];
  allImages!: ICatImage[];

  showImages = false;

  $destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<CatGalleryState>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    // preloading breedlist
    this.breedList = this.route.snapshot.data['breeds'];
  }

  ngOnInit(): void {
    // first load
    this.store.dispatch(
      CatGalleryActions.getImages({
        quantity: defaultCount,
      })
    );

    //subscribing to filter changes
    this.filtersForm.valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe((filterFormValue) => {
        if (filterFormValue.hasBreed && filterFormValue.breeds.length === 0) {
          filterFormValue.breeds = ['none'];
        }
        const filter = {
          ...filterFormValue,
          breeds: filterFormValue.breeds ?? [],
        };
        this.store.dispatch(CatGalleryActions.changeFilter({ filter }));

        this.loadFilteredImages(filter);
      });

    // subscriving to set of images changes
    !this.imagesData$.pipe(takeUntil(this.$destroy)).subscribe((value) => {
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

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  get quantityCount(): number[] {
    return quantityCount;
  }

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

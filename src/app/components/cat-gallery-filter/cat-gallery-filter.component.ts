import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { Breed } from 'src/app/interfaces/cat.interface';
import { CatImageService } from 'src/app/services/cat-image.service';
import { LoaderService } from 'src/app/services/loader.service';
import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import { selectFilters } from 'src/app/store/selectors/cat-gallery.selectors';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subject, takeUntil, tap } from 'rxjs';
import {
  ImageFilter,
  CatGalleryState,
} from 'src/app/store/reducers/cat-gallery-images.reducers';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
//import { quantityCount } from './../../constants/constants';

@Component({
  selector: 'app-cat-gallery-filter',
  templateUrl: './cat-gallery-filter.component.html',
  styleUrls: ['./cat-gallery-filter.component.scss'],
})
export class CatGalleryFilterComponent implements OnInit {
  breedList!: Breed[];

  readonly filtersForm: FormGroup = this.formBuilder.group({
    breeds: { value: [], disabled: true },
    quantity: this.formBuilder.control(10),
  });
  @ViewChild('allSelected') private allSelected!: MatOption;

  hasBreed = false;
  readonly quantityCount = [1, 5, 10, 20, 50, 100];

  loading$ = this.loader.isLoading$;

  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<CatGalleryState>,
    private loader: LoaderService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    console.log(this.route.snapshot.data['breeds']);
    this.breedList = this.route.snapshot.data['breeds'];
  }

  ngOnInit(): void {}

  onSelect(): void {
    const filterFormValue = this.filtersForm.getRawValue();
    const filter = {
      ...filterFormValue,
      breeds: filterFormValue.breeds ?? [],
    };
    this.store.dispatch(CatGalleryActions.changeFilter({ filter }));

    this.store.dispatch(
      CatGalleryActions.GetImages({
        limit: filter.quantity!,
      })
    );
  }

  onHasBreed(): void {
    if (!this.hasBreed) {
      this.hasBreed = false;
      this.filtersForm.controls['breeds'].enable();
    } else {
      this.hasBreed = true;
      this.filtersForm.controls['breeds'].disable();
    }
  }
  tosslePerOne(all: any): boolean {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    if (
      this.filtersForm.controls['breeds'].value.length === this.breedList.length
    ) {
      this.allSelected.select();
    }
    return true;
  }

  toggleAllSelection(): void {
    if (this.allSelected.selected) {
      this.filtersForm.controls['breeds'].patchValue([
        ...this.breedList.map((item) => item.id),
        0,
      ]);
    } else {
      this.filtersForm.controls['breeds'].patchValue([]);
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { IBreed } from 'src/app/interfaces/cat.interface';
import * as CatGalleryActions from '../../store/actions/cat-gallery.actions';
import { MatOption } from '@angular/material/core';
import {
  ImageFilter,
  CatGalleryState,
} from 'src/app/store/reducers/cat-gallery-images.reducers';
import { ActivatedRoute } from '@angular/router';
//import { quantityCount } from './../../constants/constants';

@Component({
  selector: 'app-cat-gallery-filter',
  templateUrl: './cat-gallery-filter.component.html',
  styleUrls: ['./cat-gallery-filter.component.scss'],
})
export class CatGalleryFilterComponent implements OnInit {
  @ViewChild('allSelected') private allSelected!: MatOption;

  readonly quantityCount = [1, 5, 10, 20, 50, 100];
  readonly filtersForm: FormGroup = this.formBuilder.group({
    breeds: { value: ['abys'], disabled: false },
    quantity: this.formBuilder.control(10),
  });
  breedList!: IBreed[];

  hasBreed = true;

  constructor(
    private store: Store<CatGalleryState>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.breedList = this.route.snapshot.data['breeds'];
  }

  ngOnInit(): void {
    const filter = this.changeFilterValues();
    this.loadFilteredImages(filter);
  }

  onSelect(): void {
    const filter = this.changeFilterValues();
    this.loadFilteredImages(filter);
  }

  onHasBreed(): void {
    if (!this.hasBreed) {
      this.filtersForm.controls['breeds'].enable();
      this.filtersForm.controls['breeds'].patchValue(['abys']);
    } else {
      this.filtersForm.controls['breeds'].disable();
      this.filtersForm.controls['breeds'].patchValue(['none']);
    }
    this.hasBreed = !this.hasBreed;
    const filter = this.changeFilterValues();
    this.loadFilteredImages(filter);
  }

  changeFilterValues(): ImageFilter {
    const filterFormValue = this.filtersForm.getRawValue();
    const filter = {
      ...filterFormValue,
      breeds: filterFormValue.breeds ?? [],
    };
    this.store.dispatch(CatGalleryActions.changeFilter({ filter }));
    return filter;
  }

  loadFilteredImages(filter: ImageFilter): void {
    this.store.dispatch(
      CatGalleryActions.getFilteredImages({
        filter: filter,
      })
    );
  }

  /*
   * Function for "Select All" switching
   */
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
      this.filtersForm.controls['breeds'].patchValue(['abys']);
    }
  }
}

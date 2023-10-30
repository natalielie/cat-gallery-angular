import { createSelector } from '@ngrx/store';
import {
  CatGalleryState,
  ImageFilter,
  CatImageData,
} from '../reducers/cat-gallery-images.reducers';

export const selectFilters = createSelector(
  (state: CatGalleryState) => {
    return state.imageData.imageFilters;
  },
  (filters: ImageFilter) => {
    return filters;
  }
);

export const selectImageData = createSelector(
  (state: CatGalleryState) => {
    return state.imageData;
  },
  (imageData: CatImageData) => imageData
);

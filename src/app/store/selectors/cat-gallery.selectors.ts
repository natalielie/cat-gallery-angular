import { createSelector } from '@ngrx/store';

import {
  CatGalleryState,
  CatImageData,
} from '../reducers/cat-gallery-images.reducers';

export const selectImageData = createSelector(
  (state: CatGalleryState) => {
    return state.imageData;
  },
  (imageData: CatImageData) => imageData
);

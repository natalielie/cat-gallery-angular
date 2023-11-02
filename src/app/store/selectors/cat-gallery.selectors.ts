import { createSelector } from '@ngrx/store';

import { CatGalleryState } from '../reducers/cat-gallery-images.reducers';
import { CatImageData } from 'src/app/interfaces/cat.interface';

export const selectImageData = createSelector(
  (state: CatGalleryState) => {
    return state.imageData;
  },
  (imageData: CatImageData) => imageData
);

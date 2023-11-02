import { createAction, props } from '@ngrx/store';

import { ICatImage } from 'src/app/interfaces/cat.interface';
import { ImageFilter } from 'src/app/interfaces/cat.interface';

export const getImages = createAction(
  '[Cat Gallery] Get Images',
  props<{ quantity: number }>()
);

export const imagesLoaded = createAction(
  '[Cat Gallery] Images Loaded',
  props<{ imageResponse: ICatImage[] }>()
);

export const imagesLoadedError = createAction(
  '[Cat Gallery] Images Loaded',
  props<{ imageResponse: ICatImage[] }>()
);

export const changeFilter = createAction(
  '[Cat Gallery] Change Filter State',
  props<{ filter: ImageFilter }>()
);

export const getFilteredImages = createAction(
  '[Cat Gallery] Get Filtered Images',
  props<{ filter: ImageFilter }>()
);

import { createAction, props } from '@ngrx/store';
import { CatImage } from 'src/app/interfaces/cat.interface';
import { ImageFilter } from '../reducers/cat-gallery-images.reducers';

export const GetImages = createAction(
  '[Cat Gallery] Get Images',
  props<{ limit: number }>()
);

export const ImagesLoaded = createAction(
  '[Cat Gallery] Images Loaded',
  props<{ imageResponse: CatImage[] }>()
);

export const getFilter = createAction('[Cat Gallery] Get Filter State');

export const changeFilter = createAction(
  '[Cat Gallery] Change Filter State',
  props<{ filter: ImageFilter }>()
);

export const GetFilteredImages = createAction(
  '[Cat Gallery] Get Filtered Images',
  props<{ filter: ImageFilter }>()
);

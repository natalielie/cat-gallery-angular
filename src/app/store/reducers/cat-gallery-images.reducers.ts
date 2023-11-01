import { createReducer, on } from '@ngrx/store';

import * as CatGalleryActions from '../actions/cat-gallery.actions';
import { ICatImage } from 'src/app/interfaces/cat.interface';

export interface CatImageData {
  pending: boolean;
  images: ICatImage[];
  imageFilters: ImageFilter;
}

export interface ImageFilter {
  breeds: string[];
  quantity: number;
  hasBreed: boolean;
}

export interface CatGalleryState {
  imageData: CatImageData;
}

const initialState: CatImageData = {
  pending: false,
  images: [],
  imageFilters: {
    breeds: ['all'],
    quantity: 10,
    hasBreed: true,
  },
};

export const imageReducers = createReducer(
  initialState,
  on(CatGalleryActions.getImages, (state, { quantity }) => {
    const result = {
      ...state,
      pending: true,
      images: [],
    };
    return result;
  }),
  on(CatGalleryActions.getFilteredImages, (state, { filter }) => {
    const result = {
      ...state,
      pending: true,
      images: [],
    };
    return result;
  }),
  on(CatGalleryActions.imagesLoaded, (state, { imageResponse }) => {
    return {
      ...state,
      pending: false,
      images: imageResponse,
    };
  })
);

export const filterReducers = createReducer(
  initialState,
  on(
    CatGalleryActions.changeFilter,
    (state, { filter: { breeds, quantity, hasBreed } }) => {
      return { ...state, filter: { breeds, quantity, hasBreed } };
    }
  )
);

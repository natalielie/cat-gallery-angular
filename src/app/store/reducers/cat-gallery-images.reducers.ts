import { createReducer, on } from '@ngrx/store';
import * as CatGalleryActions from '../actions/cat-gallery.actions';
import { IBreed, ICatImage } from 'src/app/interfaces/cat.interface';

export interface CatImageData {
  pending: boolean;
  images: ICatImage[];
  imageFilters: ImageFilter;
}

export interface ImageFilter {
  breeds: string[];
  quantity: number;
}

export interface CatGalleryState {
  imageData: CatImageData;
}

const initialState: CatImageData = {
  pending: false,
  images: [],
  imageFilters: {
    breeds: ['abys'],
    quantity: 10,
  },
};

export const imageReducers = createReducer(
  initialState,
  on(CatGalleryActions.getImages, (state, { limit }) => {
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
    (state, { filter: { breeds, quantity } }) => {
      return { ...state, filter: { breeds, quantity } };
    }
  ),
  on(CatGalleryActions.getFilter, (state) => {
    const result = {
      ...state,
      pending: true,
    };
    return result;
  })
);

import { createReducer, on } from '@ngrx/store';
import * as CatGalleryActions from '../actions/cat-gallery.actions';
import { Breed, CatImage } from 'src/app/interfaces/cat.interface';

export interface CatImageData {
  pending: boolean;
  images: CatImage[];
  imageFilters: ImageFilter;
}

export interface ImageFilter {
  breeds: Breed[];
  quantity: number;
}

export interface CatGalleryState {
  imageData: CatImageData;
}

const initialState: CatImageData = {
  pending: false,
  images: [],
  imageFilters: {
    breeds: [{ id: 'abys', name: 'Abyssinian' }],
    quantity: 10,
  },
};

export const imageReducers = createReducer(
  initialState,
  on(CatGalleryActions.GetImages, (state, { limit }) => {
    const result = {
      ...state,
      pending: true,
      images: [],
    };
    return result;
  }),
  on(CatGalleryActions.GetFilteredImages, (state) => {
    const result = {
      ...state,
      pending: true,
      images: [],
    };
    return result;
  }),
  on(CatGalleryActions.ImagesLoaded, (state, { imageResponse }) => {
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

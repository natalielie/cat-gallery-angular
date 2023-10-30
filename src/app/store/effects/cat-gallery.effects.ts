import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, empty } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as CatGalleryActions from '../actions/cat-gallery.actions';
import { CatImageService } from 'src/app/services/cat-image.service';
import {
  //selectFilteredImagesByQuantity,
  selectFilters,
} from '../selectors/cat-gallery.selectors';
import { CatGalleryState } from '../reducers/cat-gallery-images.reducers';

@Injectable()
export class CatGalleryEffects {
  constructor(
    private store: Store<CatGalleryState>,
    private actions$: Actions,
    private catImageService: CatImageService
  ) {}

  public loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CatGalleryActions.GetImages),
      mergeMap((action) =>
        this.catImageService.getImages(action.limit.toString()).pipe(
          map((response) =>
            CatGalleryActions.ImagesLoaded({ imageResponse: response })
          ),
          catchError((error) => EMPTY)
        )
      )
    )
  );

  public loadFilteredImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CatGalleryActions.GetFilteredImages),
      withLatestFrom(this.store),
      mergeMap((action) =>
        this.catImageService.getImages('100').pipe(
          map((response) =>
            CatGalleryActions.ImagesLoaded({ imageResponse: response })
          ),
          catchError((error) => EMPTY)
        )
      )
    )
  );
}

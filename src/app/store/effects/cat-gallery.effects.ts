import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as CatGalleryActions from '../actions/cat-gallery.actions';
import { CatImageService } from 'src/app/services/cat-image.service';

@Injectable()
export class CatGalleryEffects {
  constructor(
    private actions$: Actions,
    private catImageService: CatImageService
  ) {}

  public loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CatGalleryActions.getImages),
      mergeMap((action) =>
        this.catImageService.getAllImages(action.quantity.toString()).pipe(
          map((response) =>
            CatGalleryActions.imagesLoaded({ imageResponse: response })
          ),
          catchError((error) => EMPTY)
        )
      )
    )
  );

  public loadFilteredImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CatGalleryActions.getFilteredImages),
      mergeMap((action) =>
        this.catImageService.getCatsFilteredImages(action.filter).pipe(
          map((response) =>
            CatGalleryActions.imagesLoaded({ imageResponse: response })
          ),
          catchError((error) => EMPTY)
        )
      )
    )
  );
}

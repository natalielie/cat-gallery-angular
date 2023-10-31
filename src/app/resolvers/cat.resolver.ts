import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { CatImageService } from '../services/cat-image.service';
import { IBreed } from '../interfaces/cat.interface';

export const CatResolver: ResolveFn<IBreed[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<IBreed[]> => {
  const catImageService = inject(CatImageService);

  switch (state.url) {
    case '/':
      return catImageService.getBreeds().pipe(
        take(1),
        mergeMap((breeds) => {
          if (breeds) {
            return of(breeds);
          } else {
            return EMPTY;
          }
        })
      );

    default:
      return EMPTY;
  }
};

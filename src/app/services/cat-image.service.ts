import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBreed, ICatImage } from '../interfaces/cat.interface';
import { apiRequest } from '../shared/api.example';
import { ImageFilter } from '../store/reducers/cat-gallery-images.reducers';

/**
 * A service for executing all api requests
 */
@Injectable({
  providedIn: 'root',
})
export class CatImageService {
  constructor(private httpClient: HttpClient) {}

  getAllImages(limit: string): Observable<ICatImage[]> {
    const params = new HttpParams().set('limit', limit);
    return this.httpClient.get<ICatImage[]>(
      `${apiRequest.apiUrl}images/search?${params}`
    );
  }

  getBreeds(): Observable<IBreed[]> {
    return this.httpClient.get<IBreed[]>(`${apiRequest.apiUrl}breeds/`);
  }

  /**
   * getting images with chosen attributes
   *
   * @param filter attributes a user chose to filter images
   *
   */
  getCatsFilteredImages(filter: ImageFilter): Observable<ICatImage[]> {
    if (!filter.hasBreed) {
      return this.httpClient.get<ICatImage[]>(
        `${apiRequest.apiUrl}images/search?has_breeds=0&limit=${filter.quantity}`
      );
    }
    if (filter.breeds[0] === 'all') {
      return this.httpClient.get<ICatImage[]>(
        `${apiRequest.apiUrl}images/search?has_breeds=1&limit=${filter.quantity}`
      );
    } else {
      return this.httpClient.get<ICatImage[]>(
        `${
          apiRequest.apiUrl
        }images/search?breed_ids=${filter.breeds.toString()}&limit=${
          filter.quantity
        }`
      );
    }
  }
}

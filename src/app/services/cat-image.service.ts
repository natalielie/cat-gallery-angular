import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IBreed, ICatImage } from '../interfaces/cat.interface';
import { apiRequest } from '../shared/api.example';
import { ImageFilter } from '../interfaces/cat.interface';

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
    const params = new HttpParams().set('limit', filter.quantity);
    if (!filter.hasBreed) {
      params.set('hasBreed', 0);
      return this.httpClient.get<ICatImage[]>(
        `${apiRequest.apiUrl}images/search?`,
        { params }
      );
    }
    if (filter.breeds[0] === 'all') {
      params.set('hasBreed', 1);
      // return this.httpClient.get<ICatImage[]>(
      //   `${apiRequest.apiUrl}images/search?has_breeds=1&limit=${filter.quantity}`
      return this.httpClient.get<ICatImage[]>(
        `${apiRequest.apiUrl}images/search?`,
        { params }
      );
    } else {
      params.set('breed_ids', filter.breeds.toString());
      return this.httpClient.get<ICatImage[]>(
        `${apiRequest.apiUrl}images/search?`,
        { params }
      );
    }
  }
}

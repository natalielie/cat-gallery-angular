import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { IBreed, ICatImage } from '../interfaces/cat.interface';
import { apiRequest } from '../shared/api.example';
import { ImageFilter } from '../store/reducers/cat-gallery-images.reducers';

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

  getCatsFilteredImages(filter: ImageFilter): Observable<ICatImage[]> {
    if (filter.breeds.length === 0) {
      `${apiRequest.apiUrl}images/`;
    }
    if (filter.breeds[0] === 'none') {
      return this.httpClient.get<ICatImage[]>(
        `${apiRequest.apiUrl}images/search?limit=${filter.quantity}`
      );
    }
    return this.httpClient.get<ICatImage[]>(
      `${
        apiRequest.apiUrl
      }images/search?breed_ids=${filter.breeds.toString()}&limit=${
        filter.quantity
      }`
    );
  }
}

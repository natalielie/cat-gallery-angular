import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Breed, CatImage } from '../interfaces/cat.interface';
import { apiRequest } from '../shared/api.example';
import { ImageFilter } from '../store/reducers/cat-gallery-images.reducers';

@Injectable({
  providedIn: 'root',
})
export class CatImageService {
  constructor(private httpClient: HttpClient) {}

  getImages(limit: string): Observable<CatImage[]> {
    const params = new HttpParams().set('limit', limit);
    return this.httpClient.get<CatImage[]>(
      `${apiRequest.apiUrl}images/search?${params}`
    );
  }

  getBreeds(): Observable<Breed[]> {
    return this.httpClient.get<Breed[]>(`${apiRequest.apiUrl}breeds/`);
  }

  getCatsFilteredImages(filter: ImageFilter): Observable<CatImage[]> {
    if (filter.breeds[0].id !== 'none' && filter.breeds[0].id !== 'all') {
      return this.httpClient.get<CatImage[]>(
        `/images/search?limit=${filter.quantity}&breed_ids=${filter.breeds}`
      );
    }
    if (filter.breeds[0].id === 'none') {
      return this.httpClient.get<CatImage[]>(
        `/images/search?limit=${filter.quantity}&breed_ids=${filter.breeds}`
      );
    }
    if (filter.breeds[0].id === 'all') {
      return this.httpClient.get<CatImage[]>(
        `/images/search?limit=${filter.quantity}&breed_ids=${filter.breeds}`
      );
    }
    return this.httpClient.get<CatImage[]>(
      `/images/search?limit=${filter.quantity}`
    );
  }
}

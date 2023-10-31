import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiRequest } from '../shared/api.example';

/**
 * An interceptor which provides the API key to get the access to the db
 */
@Injectable()
export class CatImageInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'x-api-key': apiRequest.apiKey,
      },
    });

    return next.handle(request);
  }
}

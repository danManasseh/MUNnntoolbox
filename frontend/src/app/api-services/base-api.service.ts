import { Injector } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthStoreService } from './auths/auth.store.service';

/**
 * An abstract class for all api service classes
 * get, post, delete and put methods are abstracted.
 */
export abstract class BaseApiService {
  private _httpClient: HttpClient;
  private _authStoreService: AuthStoreService;

  constructor(public injector: Injector) {
    this._httpClient = injector.get(HttpClient);
    this._authStoreService = injector.get(AuthStoreService);
  }

  /**
   * Abstracted method for get action
   * @param urlPath Complete URL path
   * @param params Key Value Object for Query Parameters
   * @returns Observable that returns type T instance
   */
  protected getAction<T>(urlPath: string, params?: {}): Observable<T> {
    return this._httpClient
      .get<T>(this.constructRequestUrl(urlPath, params), {
        headers: this.constructRequestHeaders(),
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<T>) => response.body as T),
        catchError((error: any) => this.handleError(error))
      );
  }

  /**
   * Abstracted method for post action
   * @param urlPath Complete URL path
   * @param data Data to post
   * @param params Key Value Object for Query Parameters
   * @returns Observable that returns type T instance
   */
  protected postAction<T>(
    urlPath: string,
    data: any,
    params?: {}
  ): Observable<T> {
    return this._httpClient
      .post<T>(this.constructRequestUrl(urlPath, params), data, {
        headers: this.constructRequestHeaders(),
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<T>) => response.body as T),
        catchError((error: any) => this.handleError(error))
      );
  }

  /**
   * Abstracted method for put action
   * @param urlPath Complete URL path
   * @param data Data to pass to services
   * @param params Key Value Object for Query Parameters
   * @returns Observable that returns type T instance
   */
  protected putAction<T>(
    urlPath: string,
    data: any,
    params?: {}
  ): Observable<T> {
    return this._httpClient
      .put<T>(this.constructRequestUrl(urlPath, params), data, {
        headers: this.constructRequestHeaders(),
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<T>) => response.body as T),
        catchError((error: any) => this.handleError(error))
      );
  }

  /**
   * Abstracted method for delete action
   * @param urlPath Complete URL path
   * @param params Key Value Object for Query Parameters
   */
  protected deleteAction<T>(urlPath: string, params?: {}): Observable<void> {
    return this._httpClient
      .delete<void>(this.constructRequestUrl(urlPath, params), {
        headers: this.constructRequestHeaders(),
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<void>) => response.ok),
        catchError((error: any) => this.handleError(error))
      );
  }

  /**
   * Abstracted method for download action
   * @param urlPath Complete URL path
   * @param params Key Value Object for Query Parameters
   */
  protected downloadAction(urlPath: string, params?: {}): Observable<Blob> {
    return this._httpClient
      .get(this.constructRequestUrl(urlPath, params), {
        headers: this.constructRequestHeaders(),
        responseType: 'blob',
      })
      .pipe(
        map((res) => res),
        catchError((error: any) => this.handleError(error))
      );
  }

  /**
   * Constructs Request Headers
   */
  protected constructRequestHeaders(): HttpHeaders {
    if (this._authStoreService.isLoggedIn()) {
      return new HttpHeaders({
        'x-access-token': atob(this._authStoreService.getToken() ?? '')
      });
    }
    return new HttpHeaders({});
  }

  /**
   * Constructs Request URL by joining the main url and query parameters
   */
  protected constructRequestUrl(apiUrl: string, params?: {}): string {
    let path = apiUrl;
    path += '?';
    if (params) {
      Object.entries(params).forEach((entry: any[]) => {
        if (entry[1]) {
          path += path.endsWith('?') || path.endsWith('&') ? '' : '&';
          path += `${entry[0]}=${encodeURIComponent(entry[1])}`;
        }
      });
    }
    return path.endsWith('?') || path.endsWith('&') ? path.slice(0, -1) : path;
  }

  /**
   * Wraps API error, process it and returns the processed error if necessary
   */
  protected handleError(error: any): Observable<any> {
    // TODO: we have to update this method once we know how backend is responding the error
    if (error) {
      if (error.status) {
        switch (error.status) {
          case 400:
            break;
          case 401: // unaunthicated error
            break;
          case 402:
            break;
          case 403: // unauthorized error
            break;
          case 500:
            return throwError(() => 'Internal Server Error. Please contact administrator if error persist.');
          default:
            break;
        }
        return throwError(() => error);
      }
      return throwError(() => error);
    }
    return throwError(() => new Error('Server Error. Specific Error Not Found.'));
  }
}

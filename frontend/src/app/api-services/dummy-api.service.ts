import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


import { BaseApiService } from './base-api.service';
import { DummyModel } from '../models/dummy.model';

@Injectable({
  providedIn: 'root',
})
/**
 * Dummy API service for the demo purpose
 */
export class DummyApiService extends BaseApiService {
  private dataUrl = `${environment.apiUrl}/products`;

  constructor(_injector: Injector) {
    super(_injector);
  }

  public getProductById(id: number, params?: {}): Observable<DummyModel> {
    return this.getAction<DummyModel>(`${this.dataUrl}/${id}`, params);
  }
}

import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { BaseApiService } from '../base-api.service';
import LoginModel, { LoginResponseModel } from 'src/app/models/auths/login.model';
import RegistrationModel from 'src/app/models/auths/registration.model';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth API service
 */
export class AuthApiService extends BaseApiService {
  private dataUrl = `${environment.apiUrl}/user`;

  constructor(_injector: Injector) {
    super(_injector);
  }

  /**
   * API to post/add architecture
   * @param architecture object of type ArchitectureAddModel to post
   * @param params Object that represents query parameters
   * @returns Observable<LoginResponseModel>
   */
  public sign_in(
    data: LoginModel,
    params?: {}
  ): Observable<LoginResponseModel> {
    if (environment.sampleDataAPI) return of(<LoginResponseModel>{ token: "tokenFromServer" });
    return this.postAction<LoginResponseModel>(`${this.dataUrl}/login`, data, params);
  }

  /**
   * API to register user
   * @param data object of type RegistrationModel to post
   * @param params Object that represents query parameters
   * @returns Observable<void>
   */
  public registerUser(
    data: RegistrationModel,
    params?: {}
  ): Observable<void> {
    if (environment.sampleDataAPI) {
      return of();
    }
    return this.postAction<void>(`${this.dataUrl}/register`, data, params);
  }
}
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { BaseApiService } from '../base-api.service';
import {
  ARCHITECTURE_SAMPLE_DATA,
  ArchitectureAddModel,
  ArchitectureModel,
  ArchitectureUpdateModel,
} from '../../models/architectures/architecture.model';

@Injectable({
  providedIn: 'root',
})
/**
 * Architecture API service
 */
export class ArchitectureApiService extends BaseApiService {
  private dataUrl = `${environment.apiUrl}/nn_architecture`;

  constructor(_injector: Injector) {
    super(_injector);
  }

  /**
   * API to get architecture id
   * @param architecture_id id of architecture
   * @param params Object that represents query parameters
   * @returns Observable<ArchitectureModel>
   */
  public getArchitectureById(
    architecture_id: number | string,
    params?: {}
  ): Observable<ArchitectureModel | undefined> {
    if (environment.sampleDataAPI)
      return of(
        ARCHITECTURE_SAMPLE_DATA.find(
          (x) => x.id == architecture_id
        )
      );
    return this.getAction<ArchitectureModel>(
      `${this.dataUrl}/detail?nn_architecture_id=${architecture_id}`,
      params
    );
  }

  /**
   * API to get all architectures
   * @param params Object that represents query parameters
   * @returns Observable<ArchitectureModel[]>
   */
  public getAllArchitectures(
    params?: {}
  ): Observable<ArchitectureModel[]> {
    if (environment.sampleDataAPI) {
      return of(ARCHITECTURE_SAMPLE_DATA);
    }
    return this.getAction<ArchitectureModel[]>(
      `${this.dataUrl}/list`,
    );
  }

  /**
   * API to post/add architecture
   * @param architecture object of type ArchitectureAddModel to post
   * @param params Object that represents query parameters
   * @returns Observable<ArchitectureModel>
   */
  public addArchitecture(
    architecture: ArchitectureAddModel,
    params?: {}
  ): Observable<ArchitectureModel> {
    if (environment.sampleDataAPI) {
      const timestamp = new Date().getTime().toString();
      const newData: ArchitectureModel = {
        id: timestamp,
        architecture_id: timestamp,
        created_at: new Date(),
        ...architecture,
      };
      ARCHITECTURE_SAMPLE_DATA.push(newData);
      return of(newData);
    }
    return this.postAction<ArchitectureModel>(
      `${this.dataUrl}/upload`,
      architecture,
      params
    );
  }

  /**
   * API to post/add architecture
   * @param architecture object of type ArchitectureUpdateModel to update
   * @param params Object that represents query parameters
   * @returns Observable<ArchitectureModel>
   */
  public updateArchitecture(
    archId: number | string,
    architecture: ArchitectureUpdateModel,
    params?: {}
  ): Observable<ArchitectureModel> {
    if (environment.sampleDataAPI) {
      const timestamp = new Date().getTime().toString();
      const newData: ArchitectureModel = {
        id: timestamp,
        architecture_id: timestamp,
        created_at: new Date(),
        ...architecture,
      };
      ARCHITECTURE_SAMPLE_DATA[
        ARCHITECTURE_SAMPLE_DATA.findIndex(
          (x) => x.id == archId
        )
      ] = newData;
      return of(newData);
    }
    return this.postAction<ArchitectureModel>(
      `${this.dataUrl}/edit`,
      architecture,
      params
    );
  }

  /**
   * API to delete architecture
   * @param id Id of architecture to delete
   * @param params Object that represents query parameters
   * @returns Observable<void>
   */
  public deleteArchitecture(id: any, params?: {}): Observable<void> {
    if (environment.sampleDataAPI) {
      return of();
    }
    return this.deleteAction<void>(`${this.dataUrl}/delete?nn_architecture_id=${id}`, params);
  }
}
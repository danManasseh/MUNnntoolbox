import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import 'of' for returning sample data

import { environment } from 'src/environments/environment';

import { BaseApiService } from './base-api.service';
import { TrainingModel,sampleTrainingData,sampleDatasets, sampleArchitectures, DataSet, BaseTrainingModel} from '../models/training.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingApiService extends BaseApiService {
  private dataUrl = `${environment.apiUrl}`;
  private returnSampleData = environment.sampleDataAPI;

  constructor(_injector: Injector) {
    super(_injector);
  }

  public getTrainingsByUserId(): Observable<TrainingModel[]> {
    if (this.returnSampleData) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return of(sampleTrainingData);
    } else {
      return this.getAction<TrainingModel[]>(`${this.dataUrl}/model/list`);
    }
  }

  public postTraining(data: any): Observable<TrainingModel> {
    if (this.returnSampleData) {
      const timestamp = new Date().getTime().toString();
      const newTraining: TrainingModel = {
        id: timestamp,
        ...data,
      };
      return of(newTraining);
    } else {
      return this.postAction<TrainingModel>(`${this.dataUrl}/model/train`, data);
    }
  }

  public getDatasetsByUserId(): Observable<DataSet[]> {
    if (this.returnSampleData) {
      return of(sampleDatasets);
    } else {
      return this.getAction<DataSet[]>(`${this.dataUrl}/dataset/list`);
    }
  }

  public getArchitecturesByUserId(): Observable<BaseTrainingModel[]> {
    if (this.returnSampleData) {
      return of(sampleArchitectures);
    } else {
      return this.getAction<BaseTrainingModel[]>(`${this.dataUrl}/nn_architecture/list`);
    }
  }

  public getTrainingStatusById(id:number): Observable<TrainingModel> {
      return this.getAction<TrainingModel>(`${this.dataUrl}/model/status?nn_model_id=${id}`);
  }

}

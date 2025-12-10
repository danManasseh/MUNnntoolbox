import { Injectable, Injector } from '@angular/core';
import { Observable, map, of } from 'rxjs'; // Import 'of' for returning sample data

import { environment } from 'src/environments/environment';

import { BaseApiService } from './base-api.service';
import { PredictionModel,samplePredictionData,sampleDatasets, DataSet} from '../models/prediction.model';
import{TrainingModel, sampleTrainingData} from '../models/training.model';


@Injectable({
  providedIn: 'root',
})

export class PredictionApiService extends BaseApiService {
  private dataUrl = `${environment.apiUrl}`;
  private returnSampleData = environment.sampleDataAPI;

  constructor(_injector: Injector) {
    super(_injector);
  }

  public getPredictionsByUserId(): Observable<PredictionModel[]> {
    if (this.returnSampleData) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return of(samplePredictionData);
    } else {
      return this.getAction<PredictionModel[]>(`${this.dataUrl}/prediction/list`);
    }
  }

  public postPrediction(data: any): Observable<PredictionModel> {
    if (this.returnSampleData) {
      const timestamp = new Date().getTime().toString();
      const newPrediction: PredictionModel = {
        id: timestamp,
        ...data,
      };
      return of(newPrediction);
    } else {
      return this.postAction<PredictionModel>(`${this.dataUrl}/prediction/create`, data);
    }
  }

  public getDatasetsByUserId(): Observable<DataSet[]> {
    if (this.returnSampleData) {
      return of(sampleDatasets);
    } else {
      return this.getAction<DataSet[]>(`${this.dataUrl}/dataset/list`);
    }
  }

  public getModelsByUserId(): Observable<TrainingModel[]> {
    if (this.returnSampleData) {
      return of(sampleTrainingData);
    } else {
      return this.getAction<TrainingModel[]>(`${this.dataUrl}/model/list`);
    }
  }

  public getPredictionStatusById(id:number): Observable<PredictionModel> {
      return this.getAction<PredictionModel>(`${this.dataUrl}/prediction/status?nn_prediction_id=${id}`);
  }

  public downloadPredictionFileById(id: number): Observable<File> {
    return this.downloadAction(`${this.dataUrl}/prediction/download?nn_prediction_id=${id}`).pipe(
      map((response: Blob) => {
        return new File([response], `prediction_${id}.csv`, { type: 'application/octet-stream' });
      })
    );
  }

}

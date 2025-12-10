import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatasetAddModel, DatasetModel, getSampleDataset } from '../models/dataset.model';
import { BaseApiService } from './base-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatasetService extends BaseApiService {
  private dataUrl = `${environment.apiUrl}`;
  private returnSampleData = environment.sampleDataAPI;

  constructor(_injector: Injector) {
    super(_injector);
  }

  // Method to load datasets from /api/dataset/list using GET request
  public getDatasets(): Observable<DatasetModel[]> {
    if (this.returnSampleData) {
      // Return sample data for testing without making an actual API call
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      //const sampleData: DatasetModel[] = [getSampleDataset];
      return of(getSampleDataset);
    } else {
      // Make an actual API call to fetch datasets
      return this.getAction<DatasetModel[]>(`${this.dataUrl}/dataset/list`);
    }
  }

  // Method to upload datasets along with a file to /api/dataset/upload using POST request
  public uploadDataset(add: DatasetAddModel): Observable<DatasetModel> {
    const formData: FormData = new FormData();
    formData.append('name', add.name);
    formData.append('dataset', add.dataset, add.name);
    return this.postAction<DatasetModel>(`${this.dataUrl}/dataset/upload`, formData);
  }
}
import { Component, OnInit } from '@angular/core';
import { PredictionApiService } from 'src/app/api-services/prediction-api.service';
import { DataSet, Statuses, PredictionModel} from 'src/app/models/prediction.model';
import { CreatePredictionService } from './create-prediction/create-prediction.service';
import { environment } from 'src/environments/environment';
import{TrainingModel} from '../../models/training.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { timer, interval, forkJoin } from 'rxjs';
import { filter, switchMap, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'nn-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.styles.css'],
})

export class PredictionComponent {
  public showLoader: boolean = false;
  public datasets: DataSet[] = [];
  public models: TrainingModel[] = [];
  public prediction: PredictionModel = new PredictionModel();
  public dataSource = new MatTableDataSource<PredictionModel>([]);

  public displayedColumns: string[] = ['name', 'nn_model_id', 'dataset_id', 'columns','created_at', 'status', 'download'];

  constructor(
    public predictionApiService: PredictionApiService,
    public createPredictionService: CreatePredictionService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.showLoader = true;

    this.predictionApiService.getPredictionsByUserId().subscribe({
      next: (data: PredictionModel[]) => {
        this.dataSource.data = data;
      },
      error: (err) => { },
      complete: () => {
        this.showLoader = false;
      },
    });

    this.predictionApiService.getModelsByUserId().subscribe({
      next: (data: TrainingModel[]) => {
        this.models = data;
      },
      error: (err) => { },
      complete: () => { },
    });

    this.predictionApiService.getDatasetsByUserId().subscribe({
      next: (data: DataSet[]) => {
        this.datasets = data;
      },
      error: (err) => { },
      complete: () => { },
    });

  }

  openFormDialog() {
    // Use a forkJoin to retrieve the latest datasets and models simultaneously
    forkJoin([
      this.predictionApiService.getDatasetsByUserId(),
      this.predictionApiService.getModelsByUserId()
    ]).subscribe(([datasets, models]) => {
      this.datasets = datasets;
      this.models = models;

      this.createPredictionService
        .openFormDialog({
          datasets: this.datasets,
          models: this.models
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.predictionApiService.postPrediction(result).subscribe({
              next: (newPrediction: PredictionModel) => {
                const newData = [...this.dataSource.data];
                newPrediction.status = Statuses['Pending'].name;
                newPrediction.created_at = new Date();
                newData.push(newPrediction);
                this.dataSource.data = newData;
                this.showSuccessSnackbar('Model Prediction created successfully');

                // Start checking the prediction status
                if (!environment.isTest)
                  this.checkPredictionStatus(newPrediction);
              },
              error: (error) => {
                this.showSuccessSnackbar('Model Prediction creation failed, create prediction API return error');
                console.error('Error creating new prediction:', error);
              }
            });
          }
        });
    });
  }

  showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,

    });
  }

  showErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 30000,
    });
  }


  getModelName(id: number) {
    return this.models.find(x => x.id == id)?.name;
  }

  getDatasetName(id: number) {
    return this.datasets.find(x => x.id == id)?.name;
  }

  getStatusColor(status: string): string {
    for (const key in Statuses) {
      if (Statuses.hasOwnProperty(key) && key === status) {
        return Statuses[key].color;
      }
    }
    return '';
  }

  getDisplayText(columns: string[]): string {
    const maxLengthToShow = 2;
    if (columns !== undefined){
    if (columns.length <= maxLengthToShow) {
      return columns.join(', ');
    } else {
      return columns.slice(0, maxLengthToShow).join(', ') + '...';
    }
  }
  else{
    return ''
  }
  }

  getTooltipText(columns: string[]): string {
    if (columns !== undefined)
      return columns.join(', ');
    return ''
  }

  downloadPrediction(id: number) {
    if (!environment.isTest) {
      this.predictionApiService.downloadPredictionFileById(id).subscribe({
        next: (file: File) => {
          const url = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = url;
          link.download = file.name;
          link.click();
          URL.revokeObjectURL(url);
        },
        error: (err) => {
          console.error('Failed to download prediction file', err);
        }
      });
    }
  }

  checkPredictionStatus(prediction: PredictionModel) {
    const pollInterval$ = interval(1000);
    const polling$ = pollInterval$.pipe(
      switchMap(() => this.predictionApiService.getPredictionStatusById(prediction.id))
    );

    polling$
      .pipe(
        filter((updatedPrediction) => updatedPrediction.status !== 'Pending'),
        takeWhile((updatedPrediction) => updatedPrediction.status === 'Pending', true),
      )
      .subscribe({
        next: (updatedPrediction: PredictionModel) => {
          // Update only the 'status' property in the dataSource.data array
          this.dataSource.data = this.dataSource.data.map((item) => {
            if (item.id === updatedPrediction.id) {
              this.showSuccessSnackbar('Prediction completed successfully');
              return { ...item, status: updatedPrediction.status };
            }
            return item;
          });
        },
        error: (error) => {
          console.error('Error checking prediction status:', error);
        }
      });
  }
}

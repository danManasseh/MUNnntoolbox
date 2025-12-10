import { Component} from '@angular/core';
import { TrainingApiService } from 'src/app/api-services/training-api.service';
import { DataSet, Statuses, TrainingModel, BaseTrainingModel } from 'src/app/models/training.model';
import { CreateTrainingService } from './create-training/create-training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { timer, interval, forkJoin } from 'rxjs';
import { filter, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'nn-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.styles.css'],
})

export class TrainingComponent {
  public showLoader: boolean = false;
  public datasets: DataSet[] = [];
  public architectures: BaseTrainingModel[] = [];
  public training: TrainingModel = new TrainingModel();
  public dataSource = new MatTableDataSource<TrainingModel>([]);

  public displayedColumns: string[] = ['name','nn_architecture_id', 'dataset_id', 'train_percent', 'validation_percent', 'test_percent', 'status','created_at'];

  constructor(
    public trainingApiService: TrainingApiService,
    public createTrainingService: CreateTrainingService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.showLoader = true;

    this.trainingApiService.getTrainingsByUserId().subscribe({
      next: (data: TrainingModel[]) => {
        this.dataSource.data = data;
      },
      error: (err) => {},
      complete: () => {
        this.showLoader = false;
      },
    });

    this.trainingApiService.getArchitecturesByUserId().subscribe({
      next: (data: BaseTrainingModel[]) => {
        this.architectures = data;
      },
      error: (err) => {},
      complete: () => {},
    });

    this.trainingApiService.getDatasetsByUserId().subscribe({
      next: (data: BaseTrainingModel[]) => {
        this.datasets = data;
      },
      error: (err) => {},
      complete: () => {},
    });

  }

  openFormDialog() {
    // Use a forkJoin to retrieve the latest datasets and architectures simultaneously
    forkJoin([
      this.trainingApiService.getDatasetsByUserId(),
      this.trainingApiService.getArchitecturesByUserId()
    ]).subscribe(([datasets, architectures]) => {
      // Update the datasets and architectures
      this.datasets = datasets;
      this.architectures = architectures;
  
      this.createTrainingService
        .openFormDialog({
          datasets: this.datasets,
          architectures: this.architectures
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            result.test_percent = result.test_percent/100;
            result.validation_percent = result.validation_percent/100;
            result.train_percent = result.train_percent/100;
            this.trainingApiService.postTraining(result).subscribe({
              next: (newTraining: TrainingModel) => {
                const newData = [ ...this.dataSource.data ];
                newTraining.status = Statuses['Pending'].name;
                newTraining.created_at = new Date();
                newData.push(newTraining);
                this.dataSource.data = newData;
                this.showSuccessSnackbar('Model Training created successfully');
  
                // Start checking the training status
                if(!environment.isTest)
                this.checkTrainingStatus(newTraining);
              },
              error: (error) => {
                this.showSuccessSnackbar('Model Training creation failed, create training API return error');
                console.error('Error creating new training:', error);
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
  

  getArchitectureName(id: number) {
    return this.architectures.find(x => x.id == id)?.name;
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

  checkTrainingStatus(training: TrainingModel) {
    const pollInterval$ = interval(1000);
    const polling$ = pollInterval$.pipe(
      switchMap(() => this.trainingApiService.getTrainingStatusById(training.id))
    );

    polling$
      .pipe(
        filter((updatedTraining) => updatedTraining.status !== 'Pending'),
        takeWhile((updatedTraining) => updatedTraining.status === 'Pending', true),
      )
      .subscribe({
        next: (updatedTraining: TrainingModel) => {
          // Update only the 'status' property in the dataSource.data array
          this.dataSource.data = this.dataSource.data.map((item) => {
            if (item.id === updatedTraining.id) {
              this.showSuccessSnackbar('Model Training completed successfully');
              return { ...item, status: updatedTraining.status };
            }
            return item;
          });
        },
        error: (error) => {
          console.error('Error checking training status:', error);
        }
      });
  }
}

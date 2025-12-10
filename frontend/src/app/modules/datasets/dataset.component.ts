import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DatasetModel } from 'src/app/models/dataset.model';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { CreateDatasetComponent } from './create-dataset/create-dataset.component'; // Import the dialog component
import { DatasetService } from 'src/app/api-services/dataset.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit{
  public showLoader: boolean = false;
  public datasets: DatasetModel[] = [];
  public dataset: DatasetModel = new DatasetModel();
  public dataSource = new MatTableDataSource<DatasetModel>();

  public displayedColumns: string[] = ['name','fileName', 'columns','dateCreated' ];

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog, //Inject MatDialog
    public datasetService: DatasetService 
  ) {}

  ngOnInit(): void {
    this.showLoader = true;

    this.datasetService.getDatasets().subscribe({
      next: (data: DatasetModel[]) => {
        this.dataSource.data = data;
      },
      error: (err) => {},
      complete: () => {
        this.showLoader = false;
  }
    });
  }

  openCreateDataset() {
    
    this.dialog.open(CreateDatasetComponent, {
      width: '600px',
    })
    .afterClosed()
      .subscribe((result) => {
        if (result) {
          console.log(result);
          this.datasetService.uploadDataset(result).subscribe({
            next: (newDataset: DatasetModel) => {
              const newData = [ ...this.dataSource.data ];
              newData.push(newDataset);
              this.dataSource.data = newData;
              this.showSuccessSnackbar('Dataset created successfully');
            },
            error: (error) => {
              this.showSuccessSnackbar('Error while creating the dataset.');
              console.error('Error creating new dataset:', error);
            }
          });
        }
      });
  }

  getDisplayText(columns: string[]): string {
    const maxLengthToShow = 2; 
    if (columns.length <= maxLengthToShow) {
      return columns.join(', '); 
    } else {
      return columns.slice(0, maxLengthToShow).join(', ') + '...'; 
    }
  }

  getTooltipText(columns: string[]): string {
    return columns.join(', ');
  }

  showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-success'],
  });
}
}


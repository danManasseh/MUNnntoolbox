import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DatasetAddModel, DatasetModel } from 'src/app/models/dataset.model';
import { DatasetService } from 'src/app/api-services/dataset.service';

@Component({
  selector: 'app-create-dataset',
  templateUrl: './create-dataset.component.html',
  styleUrls: ['./create-dataset.component.scss']
})
export class CreateDatasetComponent {
  dataset: DatasetAddModel = new DatasetAddModel();
  selectedFile = null; // To store the selected file

  constructor(private dialogRef: MatDialogRef<CreateDatasetComponent>,
    private datasetService: DatasetService) { }

  closeForm() {
    this.dialogRef.close(false);
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Close the dialog without taking any action.
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onUploadClick(): void {
    if (this.selectedFile) {
      this.dataset.dataset = this.selectedFile;
      this.dialogRef.close(this.dataset);
    }
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetComponent } from './dataset.component';
import { SharedModule } from 'src/app/shared.module';
import { DatasetRoutingModule } from './dataset-routing.module';
import { CreateDatasetComponent } from './create-dataset/create-dataset.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DatasetService } from 'src/app/api-services/dataset.service';



@NgModule({
  declarations: [
    DatasetComponent,
    CreateDatasetComponent
  ],
  imports: [
    CommonModule, DatasetRoutingModule, SharedModule, MatDialogModule, MatInputModule
  ],
  exports: [
    CreateDatasetComponent, DatasetComponent
  ],
  providers: [DatasetService]
})
export class DatasetModule { }

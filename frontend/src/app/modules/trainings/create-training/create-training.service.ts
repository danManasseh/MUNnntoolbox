// dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTrainingComponent } from './create-training.component';

@Injectable()
export class CreateTrainingService {
  constructor(private dialog: MatDialog) {}

  openFormDialog(data?: any) {
    const dialogRef = this.dialog.open(CreateTrainingComponent, {
      width: '600px',
      data:data,
    });

    return dialogRef;
  }
}
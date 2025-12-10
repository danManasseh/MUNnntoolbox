// dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePredictionComponent } from './create-prediction.component';

@Injectable()
export class CreatePredictionService {
  constructor(private dialog: MatDialog) {}

  openFormDialog(data?: any) {
    const dialogRef = this.dialog.open(CreatePredictionComponent, {
      width: '600px',
      data:data,
    });

    return dialogRef;
  }
}
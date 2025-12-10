import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; // Remove ReactiveFormsModule import
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSet, PredictionModel, BasePredictionModel } from 'src/app/models/prediction.model';
import { TrainingModel } from 'src/app/models/training.model';

@Component({
  selector: 'create-prediction',
  templateUrl: './create-prediction.component.html',
  styleUrls: ['./create-prediction.component.styles.css'],
})
export class CreatePredictionComponent {
  public columns: string[] = [];
  public maxAllowedColumns: number= 0
  @Input() datasets: DataSet[];
  @Input() models: TrainingModel[];

  predictionForm: FormGroup;
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<CreatePredictionComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.datasets = data.datasets;
    this.models = data.models;

    this.predictionForm = this.formBuilder.group({
      name: ['', Validators.required],
      nn_model_id: ['', Validators.required],
      dataset_id: ['', Validators.required],
      columns: ['', [Validators.required, this.numberofSelectedColumnsValidator.bind(this)]]
    });
  }

  submitForm() {
    if(this.predictionForm.invalid)
      return;

    this.dialogRef.close(this.predictionForm.value);
  }

  closeForm() {
    this.dialogRef.close(false);
  }

  setColumns(id: number) {
    this.columns = this.datasets.find(x => x.id == id)?.columns?? [];
  }
  setMaxAllowedColumns(id: number) {
    this.maxAllowedColumns = this.models.find(x => x.id == id)?.input?.length?? 0;

  }

  numberofSelectedColumnsValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selected_columns = control.value || [];
    if (selected_columns.length > this.maxAllowedColumns) {
      return { totalSelectedColumnsId: true };
    }
    return null;
  }

  getMaxErrorMessage(id: number): string {
    const limit = this.models.find(x => x.id == id)?.input?.length

    return 'Total selected input should not exceed the number of Inputs for the select Model Training (' + limit + ').';
  }
}

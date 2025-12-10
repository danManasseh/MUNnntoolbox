import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'; // Remove ReactiveFormsModule import
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSet, TrainingModel, BaseTrainingModel } from 'src/app/models/training.model';

@Component({
  selector: 'create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.styles.css'],
})
export class CreateTrainingComponent {
  public inputs: string[] = [];
  public outputs: string[]= [];
  public columns: string[] = [];
  @Input() datasets: DataSet[];
  @Input() architectures: BaseTrainingModel [];

  trainingForm: FormGroup;
  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<CreateTrainingComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.datasets = data.datasets;
    this.architectures = data.architectures;

    this.trainingForm = this.formBuilder.group({
      name: ['', Validators.required],
      nn_architecture_id: ['', Validators.required],
      dataset_id: ['', Validators.required],
      input: [[], Validators.required],
      output: [[], Validators.required],
      train_percent: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      validation_percent: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      test_percent: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    }, { validators: this.totalPercentageValidator });
  }

  submitForm() {
    if(this.trainingForm.invalid)
      return;

    this.dialogRef.close(this.trainingForm.value);
  }

  closeForm() {
    this.dialogRef.close(false);
  }

  totalPercentageValidator(group: FormGroup): { [key: string]: boolean } | null {
    const train_percent = group.get('train_percent') as AbstractControl;
    const validation_percent = group.get('validation_percent') as AbstractControl;
    const test_percent = group.get('test_percent') as AbstractControl;

    const totalPercentage = train_percent.value + validation_percent.value + test_percent.value;

    if (totalPercentage > 100) {
      return { totalPercentageExceeds100: true };
    }

    return null;
  }

  setColumns(id: number) {
    this.columns = this.outputs = this.inputs = this.datasets.find(x => x.id == id)?.columns?? [];
  }

  updateInputOutputOptions(event: any, type: 'input' | 'output') {
    if (type === 'input') {
      this.inputs = this.columns.filter(option => !event.value.includes(option));
    } else if (type === 'output') {
      this.outputs = this.columns.filter(option => !event.value.includes(option));
    }
  }
}

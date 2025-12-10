import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { PredictionComponent } from './prediction.component';
import { of } from 'rxjs';
import { samplePredictionData, sampleDatasets} from 'src/app/models/prediction.model';
import { sampleTrainingData} from 'src/app/models/training.model';
import { HttpClientModule } from '@angular/common/http';
import { PredictionApiService } from '../../api-services/prediction-api.service';
import { CreatePredictionService } from './create-prediction/create-prediction.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePredictionComponent } from './create-prediction/create-prediction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

describe('PredictionComponent', () => {
  let component: PredictionComponent;
  let fixture: ComponentFixture<PredictionComponent>;
  let createPredictionService: CreatePredictionService;
  let dialogRef: MatDialogRef<CreatePredictionComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PredictionComponent],
      imports: [MatTableModule,
         HttpClientModule,
         MatDialogModule,
         BrowserAnimationsModule,
         BrowserAnimationsModule,
         MatSnackBarModule,
         FormsModule,
         ReactiveFormsModule,
         MatTooltipModule,
         MatIconModule ,
         BrowserAnimationsModule],
      providers: [PredictionApiService,CreatePredictionService],
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(PredictionComponent);
    component = fixture.componentInstance;
    createPredictionService = TestBed.inject(CreatePredictionService);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  });

  it('should display prediction data on component initialization', fakeAsync(() => {
    // Mock the prediction data
    spyOn(component.predictionApiService, 'getPredictionsByUserId').and.returnValue(of(samplePredictionData));
    spyOn(component.predictionApiService, 'getModelsByUserId').and.returnValue(of(sampleTrainingData));
    spyOn(component.predictionApiService, 'getDatasetsByUserId').and.returnValue(of(sampleDatasets));
    fixture.detectChanges();
    const componentInstance = fixture.componentInstance;
    // Wait for asynchronous operations to complete
    tick();
    const tableRows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    expect(tableRows.length).toBe(samplePredictionData.length);

    // Compare table cells values 
    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i];
      const cells = row.queryAll(By.css('.mat-column-name, .mat-column-nn_model_id, .mat-column-dataset_id, .mat-column-columns, .mat-column-status, .mat-column-created_at'));
      expect(cells[0].nativeElement.textContent).toContain(samplePredictionData[i].name);
  
      expect(cells[1].nativeElement.textContent).toContain(componentInstance.getModelName(samplePredictionData[i].nn_model_id));

      expect(cells[2].nativeElement.textContent).toContain(componentInstance.getDatasetName(samplePredictionData[i].dataset_id));
  
      expect(cells[5].nativeElement.textContent).toContain(samplePredictionData[i].status);
  
    }
  }));
});

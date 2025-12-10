import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { TrainingComponent } from './training.component';
import { of } from 'rxjs';
import { sampleTrainingData, sampleDatasets,sampleArchitectures} from 'src/app/models/training.model';
import { HttpClientModule } from '@angular/common/http';
import { TrainingApiService } from '../../api-services/training-api.service';
import { CreateTrainingService } from './create-training/create-training.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let createTrainingService: CreateTrainingService;
  let dialogRef: MatDialogRef<CreateTrainingComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingComponent],
      imports: [MatTableModule,
         HttpClientModule,
         MatDialogModule,
         BrowserAnimationsModule,
         BrowserAnimationsModule,
         MatSnackBarModule,
         FormsModule,
         ReactiveFormsModule,
         BrowserAnimationsModule],
      providers: [TrainingApiService,CreateTrainingService],
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    createTrainingService = TestBed.inject(CreateTrainingService);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  });

  it('should display training data on component initialization', fakeAsync(() => {
    // Mock the training data
    spyOn(component.trainingApiService, 'getTrainingsByUserId').and.returnValue(of(sampleTrainingData));
    spyOn(component.trainingApiService, 'getArchitecturesByUserId').and.returnValue(of(sampleArchitectures));
    spyOn(component.trainingApiService, 'getDatasetsByUserId').and.returnValue(of(sampleDatasets));
    fixture.detectChanges();
    const componentInstance = fixture.componentInstance;
    // Wait for asynchronous operations to complete
    tick();
    const tableRows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    expect(tableRows.length).toBe(sampleTrainingData.length);

    // Compare table cells values 
    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i];
      const cells = row.queryAll(By.css('.mat-column-name, .mat-column-nn_architecture_id, .mat-column-dataset_id, .mat-column-train_percent, .mat-column-validation_percent, .mat-column-test_percent, .mat-column-status, .mat-column-created_at'));
      expect(cells[0].nativeElement.textContent).toContain(sampleTrainingData[i].name);
  
      expect(cells[1].nativeElement.textContent).toContain(componentInstance.getArchitectureName(sampleTrainingData[i].nn_architecture_id));

      expect(cells[2].nativeElement.textContent).toContain(componentInstance.getDatasetName(sampleTrainingData[i].dataset_id));
  
      expect(cells[3].nativeElement.textContent).toContain((sampleTrainingData[i].train_percent)*100 + '%');
  
      expect(cells[4].nativeElement.textContent).toContain((sampleTrainingData[i].validation_percent)*100 + '%');
  
      expect(cells[5].nativeElement.textContent).toContain((sampleTrainingData[i].test_percent)*100 + '%');
  
      expect(cells[6].nativeElement.textContent).toContain(sampleTrainingData[i].status);
  
    }
  }));
});

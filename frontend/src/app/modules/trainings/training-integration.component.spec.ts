import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { TrainingComponent } from './training.component';
import { CreateTrainingService } from './create-training/create-training.service';
import { MatDialog } from '@angular/material/dialog';
import { TrainingApiService } from 'src/app/api-services/training-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { sampleArchitectures, sampleDatasets, sampleNewTrainingData, sampleTrainingData } from 'src/app/models/training.model';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  // Mock services and dependencies
  const createTrainingService = {
    openFormDialog: () => ({
      afterClosed: () => ({
        subscribe: (callback: (formResult: any) => void) => {
          callback(sampleNewTrainingData);
        },
      }),
    }),
  };

  const trainingApiService = {
    getTrainingsByUserId: () => {
      return of(sampleTrainingData);
    },
    getArchitecturesByUserId: () => {
      return of(sampleArchitectures);
    },
    getDatasetsByUserId: () => {
      return of(sampleDatasets);
    },
    postTraining: () => {
      return of(sampleNewTrainingData);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
      ],
      providers: [
        MatSnackBar,
        { provide: CreateTrainingService, useValue: createTrainingService },
        { provide: MatDialog, useValue: {} },
        { provide: TrainingApiService, useValue: trainingApiService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open the form, insert values, submit, and add the new item to the table', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    // Find the "Create New Training" button and click it to open the form
    const createButton = fixture.debugElement.query(By.css('button'));
    createButton.triggerEventHandler('click', null);

    // Simulate filling the form and submitting
    tick();
    createTrainingService.openFormDialog().afterClosed().subscribe((formResult: any) => {
      // Ensure the form result is as expected
      expect(formResult).toEqual(sampleNewTrainingData);

      // Simulate the API response with the new training data
      spyOn(component.trainingApiService, 'postTraining').and.returnValue(of(sampleNewTrainingData));
      var tableRows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));

      expect(tableRows.length).toBe(4);
      
      // Trigger form submission
      component.openFormDialog();
      tick();

      // Verify that the new item is added to the table
      tableRows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
      expect(tableRows.length).toBe(5); 

    });
  }));
});

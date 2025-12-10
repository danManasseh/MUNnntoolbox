import { DatasetService } from './../../api-services/dataset.service';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DatasetComponent } from './dataset.component';
import { CreateDatasetComponent } from './create-dataset/create-dataset.component';
import { getSampleDataset } from 'src/app/models/dataset.model';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared.module';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


describe('DatasetComponent', () => {
  let component: DatasetComponent;
  let datePipe: DatePipe;
  let fixture: ComponentFixture<DatasetComponent>;
  let dialogRef: MatDialogRef<CreateDatasetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetComponent],
      imports: [
        MatTableModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule, 
        MatSnackBarModule,
        MatDialogModule,
        SharedModule,
        MatIconModule
      ],
      providers: [
        DatasetService, MatSnackBar, MatDialog, DatePipe
      ],
    });

    TestBed.compileComponents();

    datePipe = TestBed.inject(DatePipe);
    fixture = TestBed.createComponent(DatasetComponent);
    component = fixture.componentInstance;
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display dataset data on component initialization', fakeAsync(() => {
    // Mock the dataset data
    spyOn(component.datasetService, 'getDatasets').and.returnValue(of(getSampleDataset));
    fixture.detectChanges();
    const componentInstance = fixture.componentInstance;
    // Wait for asynchronous operations to complete
    tick();
    const tableRows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));

    // Compare table cells values 
    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i];
      const cells = row.queryAll(By.css('.mat-column-name, .mat-column-fileName, .mat-column-columns, .mat-column-dateCreated'));
      expect(cells[0].nativeElement.textContent).toContain(getSampleDataset[i].name);
      expect(cells[1].nativeElement.textContent).toContain(getSampleDataset[i].file_name);
      expect(cells[2].nativeElement.textContent).toContain(componentInstance.getDisplayText(getSampleDataset[i].columns));
      expect(cells[3].nativeElement.textContent).toContain(datePipe.transform(getSampleDataset[i].created_at, 'short'));
    }
  }));
});

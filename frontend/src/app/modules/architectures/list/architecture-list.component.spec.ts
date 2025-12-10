import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { ArchitectureListComponent } from './architecture-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared.module';
import { ArchitectureApiService } from 'src/app/api-services/architectures/architecture-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ARCHITECTURE_SAMPLE_DATA } from 'src/app/models/architectures/architecture.model';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

/**
 * Testing ArchitectureListComponent
 */
describe('ArchitectureListComponent', () => {
  let component: ArchitectureListComponent;
  let fixture: ComponentFixture<ArchitectureListComponent>;
  let compiled: any;
  let datePipe: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [ArchitectureListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchitectureListComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [ArchitectureApiService, DatePipe],
    }).compileComponents();

    TestBed.compileComponents();

    fixture = TestBed.createComponent(ArchitectureListComponent);
    component = fixture.componentInstance; // Mock the training data
    spyOn(component.architectureApiService, 'getAllArchitectures').and.returnValue(of(ARCHITECTURE_SAMPLE_DATA));

    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    datePipe = TestBed.inject(DatePipe);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // it('should render title in a h1 tag with title class', () => {
  //   expect(compiled.querySelector('h1.title').textContent).toContain(
  //     'Architectures'
  //   );
  // });

  describe('Add button', () => {
    it('should render add button', () => {
      expect(compiled.querySelector('.add-button').textContent).toContain(
        'Create New Architecture'
      );
    });

    it(`should have title 'Click to add architecture' in add button`, () => {
      expect(compiled.querySelector('.add-button').title).toContain(
        'Click to add architecture'
      );
    });
  });

  it(`check displayed columns`, () => {
    expect(component.displayedColumns).toEqual([
      'name',
      'optimizer',
      'loss',
      'metrics',
      'layers',
      'created_at',
      'action',
    ]);
  });

  it('should display architectures data on component initialization', fakeAsync(() => {
    tick();
    const tableRows = fixture.debugElement.queryAll(By.css('.mat-mdc-row'));
    expect(tableRows.length).toBe(ARCHITECTURE_SAMPLE_DATA.length);

    // Compare table cells values 
    for (let i = 0; i < tableRows.length; i++) {
      const row = tableRows[i];
      const cells = row.queryAll(By.css('.mat-column-name, .mat-column-optimizer, .mat-column-loss, .mat-column-metrics, .mat-column-layers, .mat-column-created_at, .mat-column-action'));
      expect(cells[0].nativeElement.textContent).toContain(ARCHITECTURE_SAMPLE_DATA[i].name);
      expect(cells[1].nativeElement.textContent).toContain(ARCHITECTURE_SAMPLE_DATA[i].configuration!.optimizer);
      expect(cells[2].nativeElement.textContent).toContain(ARCHITECTURE_SAMPLE_DATA[i].configuration!.loss);
      expect(cells[3].nativeElement.textContent).toContain(ARCHITECTURE_SAMPLE_DATA[i].configuration!.metrics);
      expect(cells[4].queryAll(By.css('.arch-conf-item')).length).toBe(ARCHITECTURE_SAMPLE_DATA[i].configuration!.layers!.length);
      expect(cells[5].nativeElement.textContent).toContain(datePipe.transform(ARCHITECTURE_SAMPLE_DATA[i].created_at, 'short'));
    }
  }));
});

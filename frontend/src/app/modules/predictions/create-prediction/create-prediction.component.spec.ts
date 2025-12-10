import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreatePredictionComponent } from './create-prediction.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatError } from '@angular/material/form-field';

describe('CreatePredictionComponent', () => {
  let fixture: ComponentFixture<CreatePredictionComponent>;
  let component: CreatePredictionComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePredictionComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark the form as invalid when "Name" is empty', () => {
    const nameInput = component.predictionForm.get('name')!;
    nameInput.setValue('');

    expect(component.predictionForm.valid).toBeFalsy();
    expect(nameInput.hasError('required')).toBeTruthy();
  });

  it('should call submitForm when the form is submitted', () => {
    spyOn(component, 'submitForm');
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(component.submitForm).toHaveBeenCalled();
  });

  it('should filter and update "columns" select elements', () => {
    const columnsIdSelect = fixture.nativeElement.querySelector('#columns');

    columnsIdSelect.value = 'option1';
    columnsIdSelect.dispatchEvent(new Event('change'));

    expect(columnsIdSelect.value).not.toContain('option2');
  });

  it('should validate the error for Max selected number of inputs', () => {
    component.maxAllowedColumns = 1;
    const columns_control = component.predictionForm.get('columns')!;

    columns_control.setValue(['input1', 'input2']);

    fixture.detectChanges();

    expect(component.predictionForm.valid).toBeFalsy();
    expect(columns_control.hasError('totalSelectedColumnsId')).toBeTruthy();
    
  });

});

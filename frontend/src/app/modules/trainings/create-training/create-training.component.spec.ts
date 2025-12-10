import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateTrainingComponent } from './create-training.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateTrainingComponent', () => {
  let fixture: ComponentFixture<CreateTrainingComponent>;
  let component: CreateTrainingComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTrainingComponent],
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
    fixture = TestBed.createComponent(CreateTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark the form as invalid when "Name" is empty', () => {
    const nameInput = component.trainingForm.get('name')!;
    nameInput.setValue('');

    expect(component.trainingForm.valid).toBeFalsy();
    expect(nameInput.hasError('required')).toBeTruthy(); 
  });

  it('should call submitForm when the form is submitted', () => {
    spyOn(component, 'submitForm');
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click(); 
    expect(component.submitForm).toHaveBeenCalled();
  });

  it('should filter and update "Inputs" and "Outputs" select elements', () => {
    const inputsSelect = fixture.nativeElement.querySelector('#input');
    const outputsSelect = fixture.nativeElement.querySelector('#output');

    inputsSelect.value = 'option1';
    inputsSelect.dispatchEvent(new Event('change')); 

    expect(outputsSelect.value).not.toContain('option1');

    outputsSelect.value = 'option2'; 
    outputsSelect.dispatchEvent(new Event('change'));

    expect(inputsSelect.value).not.toContain('option2');
  });

  it('should validate total percentage not exceeding 100%', () => {
    const trainPercentControl = component.trainingForm.get('train_percent')!;
    const validationPercentControl = component.trainingForm.get('validation_percent')!;
    const testPercentControl = component.trainingForm.get('test_percent')!;
  
    trainPercentControl.setValue(50);
    validationPercentControl.setValue(51);
    testPercentControl.setValue(50);
  
    fixture.detectChanges();
  
    expect(component.trainingForm.valid).toBeFalsy();
    expect(component.trainingForm.hasError('totalPercentageExceeds100')).toBeTruthy();
  });

  it('should filter "Inputs" and "Outputs" based on selection', () => {
    const inputsSelect = fixture.nativeElement.querySelector('#input');
    const outputsSelect = fixture.nativeElement.querySelector('#output');
  
    inputsSelect.value = 'option1';
    inputsSelect.dispatchEvent(new Event('change'));
  
    expect(outputsSelect.value).not.toContain('option1');
  
    outputsSelect.value = 'option2';
    outputsSelect.dispatchEvent(new Event('change'));
  
    expect(inputsSelect.value).not.toContain('option2');
  });
});

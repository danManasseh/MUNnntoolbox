import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './register.component';

/**
 * Testing RegistrationComponent
 */
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let compiled: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [RegistrationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render title "Registration" in a h2 tag', () => {
    expect(compiled.querySelector('h2').textContent).toContain(
      'Registration'
    );
  });

  describe('Register button', () => {
    it('should render Register button', () => {
      expect(compiled.querySelector('.form-button').textContent).toContain(
        'Register'
      );
    });

    it('should submitForm work in both valid and invalid', () => {
      if (component.checkIfValid()) {
        expect(fixture.nativeElement.querySelector('.form-button.disabled')).toBeFalsy();
        spyOn(component, 'submitForm');
        const submitButton = fixture.nativeElement.querySelector('.form-button');
        submitButton.click();
        expect(component.submitForm()).toHaveBeenCalled();
      } else {
        fixture.detectChanges();
        expect(compiled.querySelector('.form-button.disabled')).toBeTruthy();
      }
    });
  });

  describe('Form Fields', () => {
    it(`should have 'name' field`, () => {
      expect(compiled.querySelector('.form-input.name')).toBeTruthy();
    });
    it(`should have 'email' field`, () => {
      expect(compiled.querySelector('.form-input.email')).toBeTruthy();
    });
    it(`should have 'password' field`, () => {
      expect(compiled.querySelector('.form-input.passwrod')).toBeTruthy();
    });
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Testing LoginComponent
 */
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render title "Login" in a h2 tag', () => {
    expect(compiled.querySelector('h2').textContent).toContain(
      'Login'
    );
  });

  describe('Login button', () => {
    it('should render login button', () => {
      expect(compiled.querySelector('.form-button').textContent).toContain(
        'Login'
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
        expect(fixture.nativeElement.querySelector('.form-button.disabled')).toBeTruthy();
      }
    });
  });

  describe('Form Fields', () => {
    it(`should have 'email' field`, () => {
      expect(compiled.querySelector('.form-input.email')).toBeTruthy();
    });
    it(`should have 'password' field`, () => {
      expect(compiled.querySelector('.form-input.passwrod')).toBeTruthy();
    });
  });
});

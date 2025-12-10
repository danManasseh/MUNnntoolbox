import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Testing AuthComponent
 */
describe('AuthComponent', () => {
  let component: AuthComponent;
  let compiled: any;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [AuthComponent],
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(compiled.querySelector('h3').textContent).toContain(
      'Welcome to MUN NN Toolbox'
    );
  });

  it('should render sub-title', () => {
    expect(compiled.querySelector('h5').textContent).toContain(
      'Capstone Project - MASC Software Engineering'
    );
  });
});

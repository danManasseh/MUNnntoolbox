import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared.module';
import { DatasetModule } from '../datasets/dataset.module';
import { TrainingModule } from '../trainings/training.module';
import { ArchitectureModule } from '../architectures/architecture.module';
import { PredictionModule } from '../predictions/prediction.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Testing HomeComponent
 */
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, RouterTestingModule, SharedModule, DatasetModule, TrainingModule, ArchitectureModule, PredictionModule ],
      declarations: [HomeComponent],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

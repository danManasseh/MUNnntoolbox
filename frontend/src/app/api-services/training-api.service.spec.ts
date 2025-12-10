import { TestBed } from '@angular/core/testing';
import { TrainingApiService } from './training-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * Test of TrainingApiService
 */
describe('TrainingApiService', () => {
  let service: TrainingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TrainingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTrainingById function', () => {
    it('getTrainingById exist', () => {
      expect(service.getTrainingsByUserId).toBeTruthy();
    });
  });
});

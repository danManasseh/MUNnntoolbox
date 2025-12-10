import { TestBed } from '@angular/core/testing';
import { DummyApiService } from './dummy-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * Test of DummyApiService
 */
describe('DummyApiService', () => {
  let service: DummyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DummyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProductById function', () => {
    it('getProductById exist', () => {
      expect(service.getProductById).toBeTruthy();
    });
  });
});

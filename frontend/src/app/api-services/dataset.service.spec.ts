import { TestBed } from '@angular/core/testing';

import { DatasetService } from './dataset.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatasetService', () => {
  let service: DatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDatasets function', () => {
    it('getDatasets exist', () => {
      expect(service.getDatasets).toBeTruthy();
    });
  });


});

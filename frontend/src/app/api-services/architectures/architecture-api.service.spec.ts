import { TestBed } from '@angular/core/testing';
import { ArchitectureApiService } from './architecture-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

/**
 * Test of ArchitectureApiService
 */
describe('ArchitectureApiService', () => {
  let service: ArchitectureApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArchitectureApiService],
    });
    service = TestBed.inject(ArchitectureApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getArchitectureById method', () => {
    it('getArchitectureById exist', () => {
      expect(service.getArchitectureById).toBeTruthy();
    });
  });

  describe('getAllArchitectures method', () => {
    it('getAllArchitectures exist', () => {
      expect(service.getAllArchitectures).toBeTruthy();
    });
  });

  describe('addArchitecture method', () => {
    it('addArchitecture exist', () => {
      expect(service.addArchitecture).toBeTruthy();
    });
  });

  describe('updateArchitecture method', () => {
    it('updateArchitecture exist', () => {
      expect(service.updateArchitecture).toBeTruthy();
    });
  });

  describe('deleteArchitecture method', () => {
    it('deleteArchitecture exist', () => {
      expect(service.deleteArchitecture).toBeTruthy();
    });
  });
});

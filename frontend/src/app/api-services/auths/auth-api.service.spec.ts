import { TestBed } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

/**
 * Test of AuthApiService
 */
describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService],
    });
    service = TestBed.inject(AuthApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sign_in method', () => {
    it('sign_in exist', () => {
      expect(service.sign_in).toBeTruthy();
    });
  });

  describe('registerUser method', () => {
    it('registerUser exist', () => {
      expect(service.registerUser).toBeTruthy();
    });
  });
});

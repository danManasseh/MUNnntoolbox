import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyComponent } from './dummy.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * Testing DummyComponent
 */
describe('DummyComponent', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DummyComponent],
    });
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

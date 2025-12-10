import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { ArchitectureDesignComponent } from './architecture-design.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ARCHITECTURE_SAMPLE_DATA, ArchitectureModel } from 'src/app/models/architectures/architecture.model';

declare var LeaderLine: any;

describe('ArchitectureDesignComponent', () => {
  let component: ArchitectureDesignComponent;
  let fixture: ComponentFixture<ArchitectureDesignComponent>;
  let compiled: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [ArchitectureDesignComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectureDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag with title class', () => {
    expect(compiled.querySelector('h1.title').textContent).toContain(
      'Design Architecture'
    );
  });

  describe('Save button', () => {
    it('should render save button', () => {
      expect(compiled.querySelector('.save-button').textContent).toContain(
        'Save Architecture'
      );
    });

    it(`should have title 'Click to save architecture' in add button`, () => {
      expect(compiled.querySelector('.save-button').title).toContain(
        'Click to save architecture'
      );
    });

    it('should onSave work in both valid and invalid', () => {
      if (component.checkIfValid()) {
        expect(fixture.nativeElement.querySelector('.save-button.disabled')).toBeFalsy();
        spyOn(component, 'onSave');
        const submitButton = fixture.nativeElement.querySelector('.save-button');
        submitButton.click();
        expect(component.onSave).toHaveBeenCalled();
      } else {
        expect(fixture.nativeElement.querySelector('.save-button.disabled')).toBeTruthy();
      }
    });
  });

  describe('Form Fields', () => {
    it(`should have 'name' field`, () => {
      expect(compiled.querySelector('.model-setting-form.name')).toBeTruthy();
    });
    it(`should have 'optimizer' field`, () => {
      expect(
        compiled.querySelector('.model-setting-form.optimizer')
      ).toBeTruthy();
    });
    it(`should have 'loss' field`, () => {
      expect(compiled.querySelector('.model-setting-form.loss')).toBeTruthy();
    });
    it(`should have 'metrics' field`, () => {
      expect(
        compiled.querySelector('.model-setting-form.metrics')
      ).toBeTruthy();
    });
  });

  describe('Add Layer button', () => {
    it('should render Add Layer button', () => {
      expect(compiled.querySelector('.add-layer').textContent).toContain(
        'Add Layer'
      );
    });

    it(`should have title 'Click to add layer to the architecture' in Add Layer button`, () => {
      expect(compiled.querySelector('.add-layer').title).toContain(
        'Click to add layer to the architecture'
      );
    });

    it('should add another layer when clicked', fakeAsync(() => {
      const layercount = component.archModel.layers.length;
      fixture.detectChanges();
      tick();
      const button = fixture.debugElement.query(By.css('.add-layer'));
      button.triggerEventHandler('click', null);
      fixture.detectChanges();
      tick();
      expect(fixture.debugElement.queryAll(By.css('.layer-wrapper')).length).toEqual(layercount + 1);
    }))
  });

  describe('Testing Each Layer', () => {
    it('should have add neuron action button', () => {
      const layers = fixture.debugElement.queryAll(By.css('.layer-wrapper'));
      layers.forEach(element => {
        expect(element.query(By.css('.add-neuron'))).toBeTruthy();
      });
    });

    it('should have remove layer action button', () => {
      const layers = fixture.debugElement.queryAll(By.css('.layer-wrapper'));
      layers.forEach(element => {
        expect(element.query(By.css('.remove-layer'))).toBeTruthy();
      });
    });

    it('should have remove neuron action button', () => {
      const layers = fixture.debugElement.queryAll(By.css('.layer-wrapper'));
      layers.forEach(element => {
        expect(element.query(By.css('.neuron-wrapper'))).toBeTruthy();
        expect(element.queryAll(By.css('.neuron'))).toBeTruthy();
        expect(element.queryAll(By.css('.remove-neuron'))).toBeTruthy();
        expect(element.queryAll(By.css('.neuron')).length).toBeGreaterThanOrEqual(1);
        expect(element.queryAll(By.css('.remove-neuron')).length).toBeGreaterThanOrEqual(1);
        expect(element.queryAll(By.css('.neuron')).length).toEqual(element.queryAll(By.css('.remove-neuron')).length);
      });
    });
  });

  describe('Should Load design from existing data', () => {
    let currentData: ArchitectureModel;

    beforeEach(() => {
      currentData = ARCHITECTURE_SAMPLE_DATA[0];
      component.createArchViewModel(currentData);
      fixture.detectChanges();
    });

    it('should have correct number of layers', fakeAsync(() => {
      expect(fixture.debugElement.queryAll(By.css('.layer-wrapper')).length).toEqual(currentData.configuration!.layers!.length);
    }));

    it('should have correct name', () => {
      expect(component.archModel.name).toContain(currentData.name!);
    });

    it('should have correct optimizer', () => {
      expect(component.archModel.optimizer).toEqual(currentData.configuration!.optimizer!);
    });

    it('should have correct loss', () => {
      expect(component.archModel.loss).toEqual(currentData.configuration!.loss!);
    });

    it('should have correct metrics', () => {
      expect(component.archModel.metrics).toEqual(currentData.configuration!.metrics!);
    });

    it('should have correct number of neurons in each layer', () => {
      const layers = fixture.debugElement.queryAll(By.css('.layer-wrapper'));
      layers.forEach((element, index) => {
        expect(element.query(By.css('.neuron-wrapper'))).toBeTruthy();
        expect(element.queryAll(By.css('.neuron'))).toBeTruthy();
        expect(element.queryAll(By.css('.neuron')).length).toEqual(currentData.configuration!.layers![index].units!);
      });
    });
  });
});

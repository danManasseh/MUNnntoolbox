import { Component, Input } from '@angular/core';
import { DummyApiService } from 'src/app/api-services/dummy-api.service';
import { DummyModel } from 'src/app/models/dummy.model';

/**
 * Dummy Component to show basic test and api service call
 */
@Component({
  selector: 'nn-dummy',
  templateUrl: './dummy.component.html',
})
export class DummyComponent {
  public showLoader: boolean = false;
  public dummyProduct: DummyModel = new DummyModel();

  constructor(public dummyApiService: DummyApiService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showLoader = true;
    this.dummyApiService.getProductById(1).subscribe({
      next: (data: DummyModel) => {
        console.log(data);
        this.dummyProduct = data;
      },
      error: (err) => {},
      complete: () => {
        this.showLoader = false;
      },
    });
  }
}

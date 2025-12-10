import BaseModel from './base.model';

export class DummyModel extends BaseModel {
  public title?: string;
  public description?: string;
  public price?: number;
  public rating?: number;
}

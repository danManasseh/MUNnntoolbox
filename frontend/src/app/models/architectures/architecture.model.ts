import { ActivationFunctionTypes, ArchitectureLayerTypes, ArchitectureLossTypes, ArchitectureMetricTypes, ArchitectureOptimizerTypes, ArchitectureTypes } from 'src/app/utils/app-constant';
import BaseModel from '../base.model';

/**
 * Architecture Base Model
 */
export class ArchitectureBaseModel extends BaseModel {
  public configuration?: ArchitectureDesignModel;
}

/**
 * Model that represents the Architecture
 */
export class ArchitectureModel extends ArchitectureBaseModel {
  public architecture_id?: number | string;
  public created_at?: Date;
}

/**
 * Architecture Model to Add
 */
export class ArchitectureAddModel extends ArchitectureBaseModel { }

/**
 * Architecture Model to Update
 */
export class ArchitectureUpdateModel extends ArchitectureBaseModel { }

/**
 * Architecture Design Model
 */
export class ArchitectureDesignModel {
  public layers?: ArchitectureDesignLayerModel[];
  public optimizer?: string | number;
  public loss?: string | number;
  public metrics?: string | number | Array<string>;
}

/**
 * Model that represents the Architecture Design Model
 */
export class ArchitectureDesignLayerModel {
  public layer_id?: number;
  public layer_type?: string | number;
  public architecture_type?: string | number;
  public units?: number;
  public activation?: number | string;
}

export const ARCHITECTURE_SAMPLE_DATA: ArchitectureModel[] = <ArchitectureModel[]>[
  {
    id: '1',
    architecture_id: '1',
    name: 'Apple Architecture',
    configuration: {
      optimizer: ArchitectureOptimizerTypes.Adam,
      loss: ArchitectureLossTypes.SparseCategoricalCrossentropy,
      metrics: ArchitectureMetricTypes.F1Score,
      layers: [
        {
          layer_id: 1,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 2,
          activation: ActivationFunctionTypes.SOFTMAX,
        },
        {
          layer_id: 2,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 7,
          activation: ActivationFunctionTypes.LINEAR,
        },
        {
          layer_id: 3,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 3,
          activation: ActivationFunctionTypes.RELU,
        },
        {
          layer_id: 4,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 1,
          activation: ActivationFunctionTypes.SIGMOID,
        },
      ],
    },
    created_at: new Date(),
  },
  {
    id: '2',
    architecture_id: '2',
    name: 'Foo Arch',
    configuration: {
      optimizer: ArchitectureOptimizerTypes.Adamax,
      loss: ArchitectureLossTypes.BinaryCrossentropy,
      metrics: ArchitectureMetricTypes.Accuracy,
      layers: [
        {
          layer_id: 1,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 7,
          activation: ActivationFunctionTypes.RELU,
        },
        {
          layer_id: 2,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 5,
          activation: ActivationFunctionTypes.RELU,
        },
        {
          layer_id: 3,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 6,
          activation: ActivationFunctionTypes.RELU,
        },
        {
          layer_id: 4,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 2,
          activation: ActivationFunctionTypes.SIGMOID,
        },
      ],
    },
    created_at: new Date(),
  },
  {
    id: '3',
    architecture_id: '3',
    name: 'Test Architect',
    configuration: {
      optimizer: ArchitectureOptimizerTypes.Adagrad,
      loss: ArchitectureLossTypes.CategoricalCrossentropy,
      metrics: ArchitectureMetricTypes.Mean,
      layers: [
        {
          layer_id: 1,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 4,
          activation: ActivationFunctionTypes.SOFTMAX,
        },
        {
          layer_id: 2,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 1,
          activation: ActivationFunctionTypes.RELU,
        },
        {
          layer_id: 3,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 5,
          activation: ActivationFunctionTypes.RELU,
        },
        {
          layer_id: 4,
          layer_type: ArchitectureLayerTypes.DENSE,
          architecture_type: ArchitectureTypes.FNN,
          units: 1,
          activation: ActivationFunctionTypes.SIGMOID,
        },
      ],
    },
    created_at: new Date(),
  },
];
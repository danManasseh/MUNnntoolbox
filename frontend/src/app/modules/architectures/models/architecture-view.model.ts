import {
  ActivationFunctionTypes,
  ArchitectureLayerTypes,
  ArchitectureTypes,
  ArchitectureOptimizerTypes,
  ArchitectureLossTypes,
  ArchitectureMetricTypes,
} from 'src/app/utils/app-constant';

import * as uuid from 'uuid';

/** Model to represent the architecture */
export class ArchitectureViewModel {
  /** Unique id of layer */
  public id: string | number = uuid.v4();
  /** List of layers under this architecture */
  public layers: ArchitectureLayerViewModel[] = [
    new ArchitectureLayerViewModel(),
  ];
  /** Name of the Architecutre */
  public name: string = "";
  /** Optimizer of the Architecutre */
  public optimizer: string | number = ArchitectureOptimizerTypes.Adam;
  /** Loss of the architecture */
  public loss: string | number = ArchitectureLossTypes.BinaryCrossentropy;
  /** Metrics of the architecture */
  public metrics: string | number | Array<string> =
    ArchitectureMetricTypes.Mean;

  /**
   * Adds layer to the architecture
   * @param callBackFunction Callback function which will execute after addition of layer
   */
  public addLayer(callBackFunction?: Function): void {
    this.layers.push(new ArchitectureLayerViewModel());
    if (callBackFunction) callBackFunction();
  }

  /**
   * Removes layer from the architecture
   * @param layerId Id of Layer to delete
   * @param callBackFunction Callback function which will execute after removal of layer
   */
  public removeLayer(layerId: string, callBackFunction?: Function): void {
    if (this.layers.length < 2) return;
    if (this.layers?.findIndex((n) => n.id == layerId) > -1) {
      this.layers.splice(
        this.layers.findIndex((n) => n.id == layerId),
        1
      );
      if (callBackFunction) callBackFunction();
    }
  }

  /**
   * Check if this layer has another layer behind
   * @param layerId id of the layer to check
   * @returns True if it has another layer otherwise false
   */
  public hasNextLayer(layerId: string): boolean {
    return (
      this.layers?.findIndex((n) => n.id == layerId) + 1 < this.layers.length
    );
  }

  /**
   * Get another layer behind this layer
   * @param layerId id of the layer
   * @returns True if it has another layer otherwise false
   */
  public nextLayer(layerId: string): ArchitectureLayerViewModel {
    return this.layers[this.layers.findIndex((n) => n.id == layerId) + 1];
  }
}

/**
 * Model to represent the layer
 */
export class ArchitectureLayerViewModel {
  /** Unique id of layer */
  public id: string = uuid.v4();
  /** List of neurons under this layer */
  public neurons: ArchitectureNeuronViewModel[] = [
    new ArchitectureNeuronViewModel(),
  ];
  /**
   * Activation Function of the layer
   * @default ActivationFunctionTypes.LINEAR
   * */
  public activationFunction: string | number = ActivationFunctionTypes.LINEAR;
  /**
   * Layer type of the layer
   * @default ArchitectureLayerTypes.TYPES
   * */
  public layer_type: string | number = ArchitectureLayerTypes.DENSE;
  /**
   * Architecture of the layer
   * @default ArchitectureTypes.FNN
   * */
  public architecture_type: string | number = ArchitectureTypes.FNN;

  /**
   * Get number of neurons in the layer.
   * @returns Count of neurons in the layer
   */
  public getNeuronCount(): number {
    return this.neurons.length;
  }

  /**
   * Adds neuron to the layer
   * @param callBackFunction Callback function which will execute after addition of neuron
   */
  public addNeuron(callBackFunction?: Function): void {
    this.neurons.push(new ArchitectureNeuronViewModel());
    if (callBackFunction) callBackFunction();
  }

  /**
   * Removes neuron from the layer
   * @param neuronId Id of Neuron to delete
   * @param callBackFunction Callback function which will execute after removal of neuron
   */
  public removeNeuron(neuronId: string, callBackFunction?: Function): void {
    if (this.neurons.length < 2) return;
    if (this.neurons.findIndex((n) => n.id == neuronId) > -1) {
      this.neurons.splice(
        this.neurons.findIndex((n) => n.id == neuronId),
        1
      );
      if (callBackFunction) callBackFunction();
    }
  }
}

/**
 * Model to represent the neuron
 */
export class ArchitectureNeuronViewModel {
  /** Unique id of neuron */
  public id: string = uuid.v4();
}

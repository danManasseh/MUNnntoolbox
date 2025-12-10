export class ArchitectureConstants {
  static readonly MAX_NEURONS_PER_LAYER: number = 10;
  static readonly MAX_LAYER_PER_DESIGN: number = 10;
}

export class ActivationFunctionTypes {
  static readonly LINEAR: string = 'linear';
  static readonly RELU: string = 'relu';
  static readonly TANH: string = 'tanh';
  static readonly SIGMOID: string = 'sigmoid';
  static readonly SOFTMAX: string = 'softmax';
  static readonly EXPONENTIAL: string = 'exponential';

  static readonly TYPES: string[] = [
    ActivationFunctionTypes.LINEAR,
    ActivationFunctionTypes.RELU,
    ActivationFunctionTypes.TANH,
    ActivationFunctionTypes.SIGMOID,
    ActivationFunctionTypes.SOFTMAX,
    ActivationFunctionTypes.EXPONENTIAL,
  ];
}

export class ArchitectureLayerTypes {
  static readonly DENSE: string = 'Dense';
  static readonly Input: string = 'Input';
  static readonly Output: string = 'Output';

  static readonly TYPES: string[] = [ArchitectureLayerTypes.DENSE, ArchitectureLayerTypes.Input, ArchitectureLayerTypes.Output];
}

export class ArchitectureTypes {
  static readonly FNN: string = 'FNN';

  static readonly TYPES: string[] = [ArchitectureTypes.FNN];
}

export class ArchitectureOptimizerTypes {
  static readonly SGD: string = 'SGD';
  static readonly RMSprop: string = 'RMSprop';
  static readonly Adam: string = 'Adam';
  static readonly AdamW: string = 'AdamW';
  static readonly Adadelta: string = 'Adadelta';
  static readonly Adagrad: string = 'Adagrad';
  static readonly Adamax: string = 'Adamax';
  static readonly Adafactor: string = 'Adafactor';
  static readonly Nadam: string = 'Nadam';
  static readonly Ftrl: string = 'Ftrl';

  static readonly TYPES: string[] = [
    ArchitectureOptimizerTypes.SGD,
    ArchitectureOptimizerTypes.RMSprop,
    ArchitectureOptimizerTypes.Adam,
    ArchitectureOptimizerTypes.AdamW,
    ArchitectureOptimizerTypes.Adadelta,
    ArchitectureOptimizerTypes.Adagrad,
    ArchitectureOptimizerTypes.Adamax,
    ArchitectureOptimizerTypes.Adafactor,
    ArchitectureOptimizerTypes.Nadam,
    ArchitectureOptimizerTypes.Ftrl,
  ];
}

export class ArchitectureLossTypes {
  static readonly BinaryCrossentropy: string = 'BinaryCrossentropy';
  static readonly CategoricalCrossentropy: string = 'CategoricalCrossentropy';
  static readonly SparseCategoricalCrossentropy: string =
    'SparseCategoricalCrossentropy';
  static readonly Poisson: string = 'Poisson';
  static readonly MeanSquaredError: string = 'MeanSquaredError';
  static readonly MeanAbsoluteError: string = 'MeanAbsoluteError';
  static readonly MeanAbsolutePercentageError: string =
    'MeanAbsolutePercentageError';
  static readonly MeanSquaredLogarithmicError: string =
    'MeanSquaredLogarithmicError';
  static readonly CosineSimilarity: string = 'CosineSimilarity';

  static readonly TYPES: string[] = [
    ArchitectureLossTypes.BinaryCrossentropy,
    ArchitectureLossTypes.CategoricalCrossentropy,
    ArchitectureLossTypes.SparseCategoricalCrossentropy,
    ArchitectureLossTypes.Poisson,
    ArchitectureLossTypes.MeanSquaredError,
    ArchitectureLossTypes.MeanAbsoluteError,
    ArchitectureLossTypes.MeanAbsolutePercentageError,
    ArchitectureLossTypes.MeanSquaredLogarithmicError,
    ArchitectureLossTypes.CosineSimilarity,
  ];
}

export class ArchitectureMetricTypes {
  static readonly AUC: string = 'AUC';
  static readonly Accuracy: string = 'Accuracy';
  static readonly BinaryAccuracy: string = 'BinaryAccuracy';
  static readonly CategoricalAccuracy: string = 'CategoricalAccuracy';
  static readonly F1Score: string = 'F1Score';
  static readonly Mean: string = 'Mean';
  static readonly MAE: string = 'MAE';
  static readonly FalseNegatives: string = 'FalseNegatives';
  static readonly FalsePositives: string = 'FalsePositives';
  static readonly TrueNegatives: string = 'TrueNegatives';
  static readonly TruePositives: string = 'TruePositives';

  static readonly TYPES: string[] = [
    ArchitectureMetricTypes.AUC,
    ArchitectureMetricTypes.Accuracy,
    ArchitectureMetricTypes.BinaryAccuracy,
    ArchitectureMetricTypes.CategoricalAccuracy,
    ArchitectureMetricTypes.F1Score,
    ArchitectureMetricTypes.Mean,
    ArchitectureMetricTypes.MAE,
    ArchitectureMetricTypes.FalseNegatives,
    ArchitectureMetricTypes.FalsePositives,
    ArchitectureMetricTypes.TrueNegatives,
    ArchitectureMetricTypes.TruePositives,
  ];
}

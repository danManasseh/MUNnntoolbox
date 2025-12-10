# `model_builder.py` Documentation

## Overview:
The `model_builder.py` module provides functionalities to construct, compile, train, and evaluate deep learning models using Keras. 

## Functions:

### 1. `build_model(model_config) -> model`
This function builds and compiles a Keras model based on the provided configuration.

#### Parameters:
- `model_config`: A dictionary that describes the architecture and other configuration details of the model.

#### Returns:
- A compiled Keras model.

### 2. `train_and_evaluate_model(model, model_config, dataset, train_percent, test_percent, valid_percent, save_path="./saved_models/") -> model`
This function trains the given model on the provided dataset, evaluates it, and saves the trained model.

#### Parameters:
- `model`: A compiled Keras model.
- `model_config`: A dictionary that describes the configuration details of the model such as input_columns, output_columns, epochs, and model_id
- `dataset`: A pandas DataFrame containing the data to be used for training, validation, and testing.
- `train_percent`: A float specifying the percentage of data to be used for training.
- `test_percent`: A float specifying the percentage of data to be used for testing.
- `valid_percent`: A float specifying the percentage of data to be used for validation.
- `save_path` (optional): A string specifying the path where the trained model should be saved. Default is `./saved_models/`.

#### Returns:
- A trained Keras model.

## Sample Configuration Object:
This is an example of a model configuration object that can be used with the above functions:

```python
model_config (build_model) = {
"architecture_id": 0,
  "layers": [
    {
      "layer_id": 0,
      "layer_type": "Input",
      "architecture_type": "FNN",
      "units": 2,
      "activation": null
    },
    {
      "layer_id": 1,
      "layer_type": "Dense",
      "architecture_type": "FNN",
      "units": 5,
      "activation": "relu"
    },
    {
      "layer_id": 2,
      "layer_type": "Output",
      "architecture_type": "FNN",
      "units": 2,
      "activation": "softmax"
    }
  ],
  "optimizer": "Adam",
  "loss": "categorical_crossentropy",
  "metrics": ["accuracy"]
} 
```

```python
model_config (train_and_evaluate_model) = {
    'input_columns': ['feature1', 'feature2'],  # Names of input columns
    'output_columns': ['label1', 'label2'],     # Names of output columns
    'epochs': 20,                               # Number of training epochs (optional, default is 10 if not provided)
    'model_id': 'my_neural_network'             # ID or name for the model (to be used when saving the model)
}

```

## Usage:
1. First, define the model configuration object (like the example provided).
2. Use `build_model()` to construct the Keras model based on the configuration.
3. Use `train_and_evaluate_model()` to train the model on your dataset, evaluate it, and save the trained model.

## Note:
Make sure to handle the dependencies (`keras`, `sklearn`, etc.) by installing them via `pip` or any package manager you use.
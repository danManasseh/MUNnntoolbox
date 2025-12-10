## Documentation: `validate_nn_architecture` Function

### Overview:
The `validate_nn_architecture` function is designed to validate a neural network architecture against a provided dataset. This ensures that the specified input and output units in the architecture configuration align with the dataset columns.

### Parameters:
- **model_config (dict)**: A dictionary containing the neural network architecture details. The dictionary should have a key `'layers'` which is a list of dictionaries. Each dictionary within the `'layers'` list should represent a layer of the neural network with details such as `'layer_type'`, `'units'`, and other relevant keys.
  
- **dataset (DataFrame)**: A pandas DataFrame representing the dataset. Columns in the dataset are matched against the input and output units specified in the `model_config`.

### Returns:
- **tuple (bool, str)**: A tuple where the first value is a boolean indicating the validation status (`True` if the architecture is valid, `False` otherwise) and the second value is a descriptive message about the validation result.

### Expected Behavior:
1. Extract the number of input and output units from the `model_config`.
2. Extract the column names from the dataset based on the number of input and output units.
3. Check if there are any missing columns in the dataset based on the specified input and output units.
4. Validate the specified input and output units against the number of extracted input and output columns.
5. Construct a list of validation messages based on the discrepancies found.
6. If there are no discrepancies, return `True` with a success message. Otherwise, return `False` with the list of validation messages.

### Usage Example:
```python
model_config = {
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


dataset = pd.DataFrame({
    'feature1': [1, 2, 3],
    'feature2': [4, 5, 6],
    'label1': [0, 1, 0],
    'label2': [1, 0, 1]
})

status, message = validate_nn_architecture(model_config, dataset)
print(status)  # Expected output: True
print(message)  # Expected output: Neural network architecture is valid for the provided dataset.
```

In the given dataset:

**Features are:**
- `feature1`
- `feature2`

**Labels are:**
- `label1`
- `label2`

Features are typically the input variables that the model uses to make predictions, while labels are the target variables or the outputs that the model aims to predict. In this dataset, the features (`feature1` and `feature2`) represent the data input, and the labels (`label1` and `label2`) represent the desired output or classification.

### Notes:
- The function assumes that the first layer in the `model_config['layers']` list is the input layer, and the last layer is the output layer.
- It is important that the dataset has the expected number of columns matching the specified input and output units to ensure successful validation.
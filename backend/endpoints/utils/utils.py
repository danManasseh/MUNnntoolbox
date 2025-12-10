def validate_nn_architecture(model_config, dataset):
    
    num_input_columns = model_config['layers'][0]['units']
    num_output_columns = model_config['layers'][-1]['units']
    
    input_columns = dataset.columns[:num_input_columns]
    output_columns = dataset.columns[-num_output_columns:]

    dataset_columns = set(dataset.columns)

    missing_input_columns = set(input_columns) - dataset_columns
    missing_output_columns = set(output_columns) - dataset_columns

    input_layer = next(layer for layer in model_config['layers'] if layer['layer_type'] == 'Input')
    output_layer = next(layer for layer in model_config['layers'] if layer['layer_type'] == 'Output')

    validation_messages = []
    
    if input_layer['units'] != len(input_columns):
        validation_messages.append(f"Specified input units ({input_layer['units']}) do not match the number of input columns ({len(input_columns)}).")
        
    if output_layer['units'] != len(output_columns):
        validation_messages.append(f"Specified output units ({output_layer['units']}) do not match the number of output columns ({len(output_columns)}).")
    
    if missing_input_columns:
        validation_messages.append(f"Missing input columns: {', '.join(missing_input_columns)}")
        
    if missing_output_columns:
        validation_messages.append(f"Missing output columns: {', '.join(missing_output_columns)}")

    if not validation_messages:
        return True, "Neural network architecture is valid for the provided dataset."
    else:
        return False, "\n".join(validation_messages)

import os
import pandas as pd

from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten, LSTM, GRU, Input
from sklearn.model_selection import train_test_split
from .utils import utils
from keras.models import load_model


def build_model(model_config):
    
    model = Sequential()

    first_layer = True
    for layer in model_config["layers"]:
        layer_type = layer["layer_type"]

        if layer_type == "Input" and first_layer:
            model.add(Input(shape=(layer["units"],)))
            first_layer = False

        elif layer_type == "Dense":
            model.add(Dense(units=layer["units"], activation=layer["activation"]))
        
        elif layer_type == "Output":  # Output can be treated as a Dense layer
            model.add(Dense(units=layer["units"], activation=layer["activation"]))
        
        elif layer_type == "Conv2D":
            model.add(Conv2D(filters=layer["units"], activation=layer["activation"]))
        
        elif layer_type == "Flatten":
            model.add(Flatten())
        
        elif layer_type == "LSTM":
            model.add(LSTM(units=layer["units"], activation=layer["activation"]))
        
        elif layer_type == "GRU":
            model.add(GRU(units=layer["units"], activation=layer["activation"]))
    
    model.compile(optimizer=model_config["optimizer"],
                  loss=model_config["loss"],
                  metrics=model_config["metrics"])
    
    return model


def train_and_evaluate_model(model, model_config, dataset, train_percent, test_percent, valid_percent, save_path="./saved_models/"):
    try:
        x = dataset[model_config['Input']]
        y = dataset[model_config['Output']]
        print("hello")
        print(len(x))
        print(len(y))
        X_train, X_temp, y_train, y_temp = train_test_split(x, y, test_size=1-train_percent)

        test_ratio = test_percent / (test_percent + valid_percent)
        valid_ratio = valid_percent / (test_percent + valid_percent)

        X_test, X_valid, y_test, y_valid = train_test_split(X_temp, y_temp, test_size=valid_ratio, train_size=test_ratio)

        utils.update_nn_model_status(model_config['model_id'], "Processing")
        model.fit(X_train, y_train, validation_data=(X_valid, y_valid), epochs=model_config.get('epochs', 20))

        scores = model.evaluate(X_test, y_test, verbose=1)
        print(f"\n{model.metrics_names[0]} of Test Data: {scores[0]}")
        print(f"\n{model.metrics_names[1]} of Test Data: {scores[1]}")

        model_name = "nn_model_" + model_config['model_name'] + ".h5"
        model.save(os.path.join(save_path, model_name))

        print(f"Model saved as {model_name} in {save_path}")
        utils.update_nn_model_status(model_config['model_id'], "Completed")

        return model
    except Exception as e:
        utils.update_nn_model_status(model_config['model_id'], "Failed")
        raise e


def predict_and_save(data_frame, prediction_config, output_csv_path, saved_models_path="./saved_models/"):
    try:
        # Load the model
        model_path = os.path.join(saved_models_path, f'nn_model_{prediction_config["model_name"]}.h5')
        model = load_model(model_path)

        # Select columns for prediction
        selected_columns = prediction_config['columns']
        prediction_data = data_frame[selected_columns]

        # Verify if data shape matches model input shape
        if prediction_data.shape[1] != model.input_shape[1]:
            raise ValueError("Data shape does not match model input shape")

        # Update status to processing
        utils.update_nn_prediction_status(prediction_config['prediction_id'], "Processing")

        # Perform prediction
        predictions = model.predict(prediction_data)

        # Save predictions
        prediction_file_name = f'nn_prediction_{prediction_config["prediction_name"]}_{prediction_config["prediction_id"]}.csv'
        pd.DataFrame(predictions).to_csv(os.path.join(output_csv_path, prediction_file_name), index=False)
        print(f"Predictions saved to {output_csv_path}")

        # Update status to completed
        utils.update_nn_prediction_status(prediction_config['prediction_id'], "Completed")

    except Exception as e:
        utils.update_nn_prediction_status(prediction_config['prediction_id'], "Failed")
        print("Error occurred during prediction:", e)
        raise e

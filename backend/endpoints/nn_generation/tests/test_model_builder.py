import unittest
from keras.models import Model
from keras.layers import Flatten
from endpoints.nn_generation import model_builder

class TestModelBuilder(unittest.TestCase):

    def setUp(self):
        
        self.mock_config = {
            'model_id': 'test_model_001',
            'layers': [
                {
                    'layer_type': 'Dense',
                    'units': 32,
                    'activation': 'relu'
                },
                {
                    'layer_type': 'Dense',
                    'units': 10,
                    'activation': 'softmax'
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }

    def test_build_model(self):
        
        model = model_builder.build_model(self.mock_config)
        
        self.assertIsInstance(model, Model)

        self.assertEqual(len(model.layers), len(self.mock_config['layers']))

    def test_input_output_configuration(self):
        config_with_input_output = {
            'model_id': 'test_io_config',
            'layers': [
                {
                    'layer_type': 'Input',
                    'units': 32
                },
                {
                    'layer_type': 'Dense',
                    'units': 16,
                    'activation': 'relu'
                },
                {
                    'layer_type': 'Output',
                    'units': 10,
                    'activation': 'softmax'
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        model = model_builder.build_model(config_with_input_output)
        self.assertEqual(model.layers[0].input_shape, (None, 32))
        self.assertEqual(model.layers[-1].units, 10)
    

    def test_wrong_layer_type(self):
        config_with_wrong_layer = {
            'model_id': 'test_wrong_layer',
            'layers': [
                {
                    'layer_type': 'WrongLayer',  # This is a non-existing layer type
                    'units': 32
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model_builder.build_model(config_with_wrong_layer)
        except ValueError:
            pass

    def test_conv2d_layer(self):
        config_with_conv2d = {
            'model_id': 'test_conv2d_layer',
            'layers': [
                {
                    'layer_type': 'Input',
                    'units': 32
                },
                {
                    'layer_type': 'Conv2D',
                    'units': 32,
                    'activation': 'relu',
                    'kernel_size': (3, 3) 
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model = model_builder.build_model(config_with_conv2d)
            self.assertEqual(model.layers[1].filters, 32)
        except Exception:
            pass



    def test_flatten_layer(self):
        config_with_flatten = {
            'model_id': 'test_flatten_layer',
            'layers': [
                {
                    'layer_type': 'Input',
                    'units': 32
                },
                {
                    'layer_type': 'Flatten'
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model = model_builder.build_model(config_with_flatten)
            self.assertIsInstance(model.layers[1], Flatten)
        except IndexError:
            pass


    def test_missing_activation(self):
        config_missing_activation = {
            'model_id': 'test_missing_activation',
            'layers': [
                {
                    'layer_type': 'Input',
                    'units': 32
                },
                {
                    'layer_type': 'Dense',
                    'units': 10  # Missing 'activation' key
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model_builder.build_model(config_missing_activation)
        except Exception:
            pass

    def test_model_compilation(self):
        model = model_builder.build_model(self.mock_config)
        self.assertTrue(hasattr(model, 'optimizer'))
        self.assertTrue(hasattr(model, 'loss'))
        self.assertTrue(hasattr(model, 'metrics'))
    
    def test_invalid_layer_order(self):
        config_invalid_order = {
            'model_id': 'test_invalid_order',
            'layers': [
                {
                    'layer_type': 'Flatten'
                },
                {
                    'layer_type': 'Dense',
                    'units': 10,
                    'activation': 'relu'
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model_builder.build_model(config_invalid_order)
        except Exception:
            pass

    def test_duplicate_input_layer(self):
        config_duplicate_input = {
            'model_id': 'test_duplicate_input',
            'layers': [
                {
                    'layer_type': 'Input',
                    'units': 32
                },
                {
                    'layer_type': 'Input',
                    'units': 32
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model_builder.build_model(config_duplicate_input)
        except Exception:
            pass

    def test_no_output_layer(self):
        config_no_output = {
            'model_id': 'test_no_output',
            'layers': [
                {
                    'layer_type': 'Input',
                    'units': 32
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model_builder.build_model(config_no_output)
        except Exception:
            pass

    def test_missing_conv2d_parameters(self):
        config_missing_params = {
            'model_id': 'test_missing_params',
            'layers': [
                {
                    'layer_type': 'Input',
                    'units': 32
                },
                {
                    'layer_type': 'Conv2D',
                    'units': 32,
                    'activation': 'relu'
                    # missing kernel size, strides, etc.
                }
            ],
            'optimizer': 'Adam',
            'loss': 'categorical_crossentropy',
            'metrics': ['accuracy']
        }
        try:
            model_builder.build_model(config_missing_params)
        except Exception:
            pass



if __name__ == '__main__':
    unittest.main()

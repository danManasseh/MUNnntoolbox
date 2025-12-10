import pytest
import os
import random

from ..app import app
from ..models import NeuralNetworkModel, User, NeuralNetworkModelStatus


@pytest.fixture
def client():
    return app.test_client()


def test_train_model(client):
    test_user = User.query.filter_by(email='test@mun.ca').first()

    assert test_user is not None, "Test user was not found."

    assert test_user.token is not None, "Test user was not logged in."

    headers = {
        'x-access-token': test_user.token
    }

    request_data = {
        "nn_architecture_id": 4,
        "dataset_id": 1,
        "name": "[TEST]modelX" + str(random.randint(1000, 1700)),
        "input": ["X"],
        "output": ["Y"],
        "train_percent": 0.6,
        "validation_percent": 0.3,
        "test_percent": 0.1
    }

    model_file_path = os.path.join(app.config['NN_MODELS_FOLDER'], f"nn_model_{request_data['name']}.h5")

    try:
        response_data = client.post('/api/model/train', json=request_data, headers=headers)

        assert response_data.status_code == 200

        response_json = response_data.json

        expected_keys = ['nn_architecture_id', 'dataset_id', 'id', 'name', 'input', 'output', 'train_percent',
                         'validation_percent', 'test_percent', 'user_id', 'status', 'created_at']
        assert all(key in response_json for key in expected_keys)

        assert response_json['nn_architecture_id'] == request_data['nn_architecture_id']
        assert response_json['dataset_id'] == request_data['dataset_id']
        assert response_json['name'] == request_data['name']
        assert response_json['input'] == request_data['input']
        assert response_json['output'] == request_data['output']
        assert response_json['train_percent'] == request_data['train_percent']
        assert response_json['validation_percent'] == request_data['validation_percent']
        assert response_json['test_percent'] == request_data['test_percent']

        assert response_json['status'] in [s.value for s in NeuralNetworkModelStatus]
        assert response_json['user_id'] == test_user.public_id

        if response_json['status'] == 'Completed':
            assert os.path.exists(model_file_path), "NN Model file was not created."

    except Exception as e:
        raise e

    finally:
        if response_data and response_json:
            nn_model = NeuralNetworkModel.query.filter_by(id=response_json['id']).first()

            if nn_model:
                nn_model.delete()

            if os.path.exists(model_file_path):
                os.remove(model_file_path)



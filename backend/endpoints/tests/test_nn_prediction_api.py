import pytest
import os
import random

from ..app import app
from ..models import NeuralNetworkPrediction, User, NeuralNetworkPredictionStatus


@pytest.fixture
def client():
    return app.test_client()


def test_create_prediction(client):
    test_user = User.query.filter_by(email='test@mun.ca').first()

    assert test_user is not None, "Test user was not found."

    assert test_user.token is not None, "Test user was not logged in."

    headers = {
        'x-access-token': test_user.token
    }

    request_data = {
        "nn_model_id": 3,
        "dataset_id": 4,
        "name": "[TEST]predictionX" + str(random.randint(1000, 1700)),
        "columns": ["a", "b"]
    }

    try:
        response_data = client.post('/api/prediction/create', json=request_data, headers=headers)

        assert response_data.status_code == 200

        response_json = response_data.json

        expected_keys = ['nn_model_id', 'dataset_id', 'id', 'name', 'columns', 'user_id', 'status', 'created_at']
        assert all(key in response_json for key in expected_keys)

        assert response_json['nn_model_id'] == request_data['nn_model_id']
        assert response_json['dataset_id'] == request_data['dataset_id']
        assert response_json['name'] == request_data['name']
        assert response_json['columns'] == request_data['columns']

        assert response_json['status'] in [s.value for s in NeuralNetworkPredictionStatus]
        assert response_json['user_id'] == test_user.public_id

        prediction_file_path = os.path.join(app.config['NN_PREDICTIONS_FOLDER'],
                                            f"nn_prediction_{response_json['name']}_{response_json['id']}.csv")

        if response_json['status'] == 'Completed':
            assert os.path.exists(prediction_file_path), "NN Prediction file was not created."

    except Exception as e:
        raise e

    finally:
        if response_data and response_json:
            nn_prediction = NeuralNetworkPrediction.query.filter_by(id=response_json['id']).first()

            if nn_prediction:
                nn_prediction.delete()

            if prediction_file_path and os.path.exists(prediction_file_path):
                os.remove(prediction_file_path)



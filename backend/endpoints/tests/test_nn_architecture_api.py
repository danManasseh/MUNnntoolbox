import pytest
import random

from ..app import app
from ..models import NeuralNetworkArchitecture, User


@pytest.fixture
def client():
    return app.test_client()


def test_save_nn_architecture(client):
    test_user = User.query.filter_by(email='test@mun.ca').first()

    assert test_user is not None, "Test user was not found."

    assert test_user.token is not None, "Test user was not logged in."

    headers = {
        'x-access-token': test_user.token
    }

    request_data = {
        "name": '[TEST]ArchX' + str(random.randint(1000, 1700)),
        "configuration": {
            "layers": [{
                "layer_id": 0,
                "layer_type": "Input",
                "architecture_type": "FNN",
                "units": 1,
                "activation": None
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
                    "layer_type": "Dense",
                    "architecture_type": "FNN",
                    "units": 1,
                    "activation": "softmax"
                }
            ],
            "optimizer": "Adam",
            "loss": "categorical_crossentropy",
            "metrics": ["accuracy"]
        }
    }

    try:
        response_data = client.post('/api/nn_architecture/upload', json=request_data, headers=headers)

        assert response_data.status_code == 200

        response_json = response_data.json

        expected_keys = ['user_id', 'id', 'name', 'created_at', 'configuration']
        assert all(key in response_json for key in expected_keys)

        assert response_json['name'] == request_data['name']
        assert response_json['configuration'] == request_data['configuration']
        assert response_json['user_id'] == test_user.public_id

    except Exception as e:
        raise e

    finally:
        if response_data and response_json:
            nn_architecture = NeuralNetworkArchitecture.query.filter_by(id=response_json['id']).first()

            if nn_architecture:
                nn_architecture.delete()

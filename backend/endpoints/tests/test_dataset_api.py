import pytest
import os
import random
import pandas as pd
from werkzeug.datastructures import FileStorage

from ..app import app
from ..models import Dataset, User
from io import BytesIO


@pytest.fixture
def client():
    return app.test_client()


def test_upload_dataset(client):
    test_user = User.query.filter_by(email='test@mun.ca').first()

    assert test_user is not None, "Test user was not found."

    assert test_user.token is not None, "Test user was not logged in."

    headers = {
        'x-access-token': test_user.token
    }

    dataset_name = '[TEST]DatasetX' + str(random.randint(1000, 1700))
    dataset_file_name = dataset_name + '.csv'
    dataset_file_path = os.path.join(app.config['DATASETS_FOLDER'], 'sample.csv')

    df = pd.read_csv(dataset_file_path)
    list_of_column_names = list(df.columns)

    saved_dataset_file_path = os.path.join(app.config['DATASETS_FOLDER'], dataset_file_name)

    dataset_file = FileStorage(
        stream=open(dataset_file_path, "rb"),
        filename=dataset_file_name,
        content_type='text/csv',
    )

    try:
        response_data = client.post('/api/dataset/upload',
                                    data={
                                        'dataset': dataset_file,
                                        'name': dataset_name
                                    },
                                    headers=headers,
                                    content_type='multipart/form-data')

        assert response_data.status_code == 200

        response_json = response_data.json

        expected_keys = ['user_id', 'id', 'name', 'created_at', 'columns', 'file_name']
        assert all(key in response_json for key in expected_keys)

        assert response_json['name'] == dataset_name
        assert response_json['columns'] == list_of_column_names
        assert response_json['user_id'] == test_user.public_id

        assert os.path.exists(dataset_file_path), "Dataset file was not saved on the server."

    except Exception as e:
        raise e

    finally:
        if response_data and response_json:
            dataset = Dataset.query.filter_by(id=response_json['id']).first()

            if dataset:
                dataset.delete()

            if os.path.exists(saved_dataset_file_path):
                os.remove(saved_dataset_file_path)



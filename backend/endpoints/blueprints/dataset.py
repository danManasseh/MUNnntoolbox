import pandas as pd
import os

from flask import Blueprint, request, jsonify, current_app
from ..wraps import token_required
from ..models import Dataset


dataset_blueprint = Blueprint("dataset", __name__)


@dataset_blueprint.route('/api/dataset/upload', methods=['POST'])
@token_required
def upload_dataset(current_user):
    dataset_file = request.files['dataset']
    df = pd.read_csv(dataset_file)
    list_of_column_names = list(df.columns)

    dataset = Dataset(
        user_id=current_user.id,
        name=request.form['name'],
        file_name=request.files['dataset'].filename,
        columns=','.join(list_of_column_names)
    )

    dataset.save(commit=True)
    df.to_csv(os.path.join(current_app.config['DATASETS_FOLDER'], dataset.file_name))

    return jsonify({'id': dataset.id,
                    'user_id': current_user.public_id,
                    'name': dataset.name,
                    'file_name': dataset.file_name,
                    'columns': dataset.columns.split(','),
                    'created_at': dataset.created_at.strftime("%Y-%m-%d %H:%M:%S")})


@dataset_blueprint.route('/api/dataset/list', methods=['GET'])
@token_required
def get_all_datasets(current_user):
    all_datasets = Dataset.query.filter_by(user_id=current_user.id)
    output = []
    for dataset in all_datasets:
        output.append({
            'id': dataset.id,
            'user_id': current_user.public_id,
            'name': dataset.name,
            'file_name': dataset.file_name,
            'columns': dataset.columns.split(','),
            'created_at': dataset.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(output)

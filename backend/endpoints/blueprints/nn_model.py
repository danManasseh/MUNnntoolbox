import pandas
import os

from flask import Blueprint, request, jsonify, current_app
from ..wraps import token_required
from ..models import NeuralNetworkModel, NeuralNetworkArchitecture, Dataset, NeuralNetworkModelStatus
from ..nn_generation.model_builder import build_model, train_and_evaluate_model

nn_model_blueprint = Blueprint("nn_model", __name__)


def format_nn_model(nn_model, current_user):
    return {
        "nn_architecture_id": nn_model.nn_architecture_id,
        "dataset_id": nn_model.dataset_id,
        "id": nn_model.id,
        "name": nn_model.name,
        "input": nn_model.input.split(','),
        "output": nn_model.output.split(','),
        "train_percent": nn_model.train_percent,
        "validation_percent": nn_model.validation_percent,
        "test_percent": nn_model.test_percent,
        "user_id": current_user.public_id,
        "status": nn_model.status.value,
        "created_at": nn_model.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }


@nn_model_blueprint.route('/api/model/train', methods=['POST'])
@token_required
def train_model(current_user):
    data = request.get_json()

    dataset = Dataset.query.filter_by(id=data['dataset_id']).first()
    data_frame = pandas.read_csv(os.path.join(current_app.config['DATASETS_FOLDER'], dataset.file_name))

    nn_architectures = NeuralNetworkArchitecture.query.filter_by(id=data['nn_architecture_id']).first()

    model = build_model(nn_architectures.configuration)

    nn_model = NeuralNetworkModel(
        user_id=current_user.id,
        nn_architecture_id=data['nn_architecture_id'],
        dataset_id=data['dataset_id'],
        name=data['name'],
        input=','.join(data['input']),
        output=','.join(data['output']),
        train_percent=data['train_percent'],
        validation_percent=data['validation_percent'],
        test_percent=data['test_percent'],
        status=NeuralNetworkModelStatus.Defined
    )

    nn_model.save(commit=True)

    nn_model_config = {
        "Input": data['input'],
        "Output": data['output'],
        "model_id": nn_model.id,
        "model_name": nn_model.name
    }

    saved_nn_models_path = current_app.config['NN_MODELS_FOLDER']

    train_and_evaluate_model(model,
                             nn_model_config,
                             data_frame,
                             nn_model.train_percent,
                             nn_model.validation_percent,
                             nn_model.test_percent,
                             save_path=saved_nn_models_path)

    nn_model.refresh()

    return jsonify(format_nn_model(nn_model, current_user))


@nn_model_blueprint.route('/api/model/list', methods=['GET'])
@token_required
def get_all_nn_models(current_user):
    all_nn_models = NeuralNetworkModel.query.filter_by(user_id=current_user.id)
    output = []
    for nn_model in all_nn_models:
        output.append(format_nn_model(nn_model, current_user))

    return jsonify(output)


@nn_model_blueprint.route('/api/model/status', methods=['GET'])
@token_required
def get_nn_model(current_user):
    nn_model_id = request.args.get('nn_model_id')

    nn_model = NeuralNetworkModel.query.filter_by(user_id=current_user.id, id=nn_model_id).first()

    return jsonify({
        "id": nn_model.id,
        "name": nn_model.name,
        "user_id": current_user.public_id,
        "status": nn_model.status.value,
        "created_at": nn_model.created_at.strftime("%Y-%m-%d %H:%M:%S")
    })

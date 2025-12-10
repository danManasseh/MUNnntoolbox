import pandas
import os

from flask import Blueprint, request, jsonify, current_app, send_from_directory
from ..wraps import token_required
from ..models import Dataset
from ..models import NeuralNetworkPredictionStatus, NeuralNetworkPrediction
from ..models import NeuralNetworkModel, NeuralNetworkModelStatus
from ..nn_generation.model_builder import predict_and_save

nn_prediction_blueprint = Blueprint("prediction", __name__)


def format_nn_prediction(nn_prediction, current_user):
    return {
        "nn_model_id": nn_prediction.nn_model_id,
        "dataset_id": nn_prediction.dataset_id,
        "id": nn_prediction.id,
        "name": nn_prediction.name,
        "columns": nn_prediction.columns.split(','),
        "user_id": current_user.public_id,
        "status": nn_prediction.status.value,
        "created_at": nn_prediction.created_at.strftime("%Y-%m-%d %H:%M:%S")
    }


@nn_prediction_blueprint.route('/api/prediction/create', methods=['POST'])
@token_required
def create_prediction(current_user):
    data = request.get_json()

    dataset = Dataset.query.filter_by(id=data['dataset_id']).first()
    data_frame = pandas.read_csv(os.path.join(current_app.config['DATASETS_FOLDER'], dataset.file_name))

    nn_model = NeuralNetworkModel.query.filter_by(id=data['nn_model_id']).first()

    if nn_model.status is not NeuralNetworkModelStatus.Completed:
        return "NN model status is not completed.", 400

    nn_prediction = NeuralNetworkPrediction(
        user_id=current_user.id,
        nn_model_id=data['nn_model_id'],
        dataset_id=data['dataset_id'],
        name=data['name'],
        columns=','.join(data['columns']),
        status=NeuralNetworkPredictionStatus.Defined
    )

    nn_prediction.save(commit=True)

    saved_predictions_path = current_app.config['NN_PREDICTIONS_FOLDER']
    saved_nn_models_path = current_app.config['NN_MODELS_FOLDER']

    nn_prediction_config = {
        "prediction_id": nn_prediction.id,
        "prediction_name": nn_prediction.name,
        "model_name": nn_model.name,
        "columns": nn_prediction.columns.split(',')
    }

    predict_and_save(data_frame, nn_prediction_config, saved_predictions_path, saved_nn_models_path)

    nn_prediction.refresh()

    return jsonify(format_nn_prediction(nn_prediction, current_user))


@nn_prediction_blueprint.route('/api/prediction/list', methods=['GET'])
@token_required
def get_all_nn_predictions(current_user):
    all_nn_predictions = NeuralNetworkPrediction.query.filter_by(user_id=current_user.id)
    output = []
    for nn_prediction in all_nn_predictions:
        output.append(format_nn_prediction(nn_prediction, current_user))

    return jsonify(output)


@nn_prediction_blueprint.route('/api/prediction/status', methods=['GET'])
@token_required
def get_nn_prediction(current_user):
    nn_prediction_id = request.args.get('nn_prediction_id')

    nn_prediction = NeuralNetworkPrediction.query.filter_by(user_id=current_user.id, id=nn_prediction_id).first()

    return jsonify({
            "id": nn_prediction.id,
            "name": nn_prediction.name,
            "user_id": current_user.public_id,
            "status": nn_prediction.status.value,
            "created_at": nn_prediction.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })


@nn_prediction_blueprint.route('/api/prediction/download', methods=['GET'])
@token_required
def download(current_user):
    nn_prediction_id = request.args.get('nn_prediction_id')
    nn_prediction = NeuralNetworkPrediction.query.filter_by(user_id=current_user.id, id=nn_prediction_id).first()
    return send_from_directory(
        current_app.config['NN_PREDICTIONS_FOLDER'], f'nn_prediction_{nn_prediction.name}_{nn_prediction.id}.csv',
        as_attachment=True
    )

from flask import Blueprint, request, jsonify
from ..wraps import token_required
from ..models import NeuralNetworkArchitecture

nn_architecture_blueprint = Blueprint("nn_architecture", __name__)


@nn_architecture_blueprint.route('/api/nn_architecture/upload', methods=['POST'])
@token_required
def save_nn_architecture(current_user):
    data = request.get_json()

    nn_architecture = NeuralNetworkArchitecture(
        user_id=current_user.id,
        name=data['name'],
        configuration=data['configuration']
    )
    nn_architecture.save(commit=True)

    return jsonify({'id': nn_architecture.id,
                    'user_id': current_user.public_id,
                    'name': nn_architecture.name,
                    'configuration': nn_architecture.configuration,
                    'created_at': nn_architecture.created_at.strftime("%Y-%m-%d %H:%M:%S")})


@nn_architecture_blueprint.route('/api/nn_architecture/list', methods=['GET'])
@token_required
def get_all_nn_architectures(current_user):
    all_nn_architectures = NeuralNetworkArchitecture.query.filter_by(user_id=current_user.id)
    output = []
    for nn_architecture in all_nn_architectures:
        output.append({
            'id': nn_architecture.id,
            'user_id': current_user.public_id,
            'name': nn_architecture.name,
            'configuration': nn_architecture.configuration,
            'created_at': nn_architecture.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return jsonify(output)


@nn_architecture_blueprint.route('/api/nn_architecture/edit', methods=['POST'])
@token_required
def edit_nn_architecture(current_user):
    data = request.get_json()

    nn_architecture = NeuralNetworkArchitecture.query.filter_by(user_id=current_user.id, id=data["id"]).first()

    nn_architecture.name = data["name"]
    nn_architecture.configuration = data["configuration"]

    nn_architecture.update()

    return jsonify({'id': nn_architecture.id,
                    'user_id': current_user.public_id,
                    'name': nn_architecture.name,
                    'configuration': nn_architecture.configuration,
                    'created_at': nn_architecture.created_at.strftime("%Y-%m-%d %H:%M:%S")
                    })


@nn_architecture_blueprint.route('/api/nn_architecture/detail', methods=['GET'])
@token_required
def get_nn_architecture(current_user):
    nn_architecture_id = request.args.get('nn_architecture_id')

    nn_architecture = NeuralNetworkArchitecture.query.filter_by(user_id=current_user.id, id=nn_architecture_id).first()

    return jsonify({'id': nn_architecture.id,
                    'user_id': current_user.public_id,
                    'name': nn_architecture.name,
                    'configuration': nn_architecture.configuration,
                    'created_at': nn_architecture.created_at.strftime("%Y-%m-%d %H:%M:%S")
                    })


@nn_architecture_blueprint.route('/api/nn_architecture/delete', methods=['DELETE'])
@token_required
def delete_nn_architecture(current_user):
    nn_architecture_id = request.args.get('nn_architecture_id')

    nn_architecture = NeuralNetworkArchitecture.query.filter_by(user_id=current_user.id, id=nn_architecture_id).first()
    nn_architecture.delete()

    return jsonify({'message': f'Neural Architecture with ID {nn_architecture_id} deleted successfully.'})

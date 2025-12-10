import uuid
import jwt

from flask import Blueprint, request, jsonify, make_response, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from ..wraps import token_required
from ..models import User


authentication_blueprint = Blueprint("authentication", __name__)


@authentication_blueprint.route('/api/user/list', methods=['GET'])
@token_required
def get_all_users(current_user):
    users = User.query.all()
    output = []
    for user in users:
        output.append({
            'public_id': user.public_id,
            'name': user.name,
            'email': user.email
        })

    return jsonify({'users': output})


@authentication_blueprint.route('/api/user/login', methods=['POST'])
def login():
    auth = request.get_json()

    if not auth or not auth.get('email') or not auth.get('password'):
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required!"'}
        )

    user = User.query \
        .filter_by(email=auth.get('email')) \
        .first()

    if not user:
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist!"'}
        )

    if check_password_hash(user.password, auth.get('password')):
        token = jwt.encode({
            'public_id': user.public_id,
            'exp': datetime.utcnow() + timedelta(days=60)
        }, current_app.config['SECRET_KEY'])

        user.token = token
        user.update()

        return make_response(jsonify({'token': token}), 201)
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Wrong Password!"'}
    )


@authentication_blueprint.route('/api/user/register', methods=['POST'])
def register():
    data = request.get_json()

    name, email = data.get('name'), data.get('email')
    password = data.get('password')

    user = User.query \
        .filter_by(email=email) \
        .first()
    if not user:
        user = User(
            public_id=str(uuid.uuid4()),
            name=name,
            email=email,
            password=generate_password_hash(password)
        )
        user.save(commit=True)

        return make_response({"message": "Successfully registered."}, 201)
    else:
        return make_response({"message": "User already exists."}, 202)


@authentication_blueprint.route('/api/user/logout', methods=['POST'])
@token_required
def logout(current_user):
    current_user.token = None
    current_user.update()

    return make_response({"message": "Successfully logout."}, 201)


@authentication_blueprint.route('/api/user/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return make_response(jsonify({
        'public_id': current_user.public_id,
        'name': current_user.name,
        'email': current_user.email
    }), 201)


@authentication_blueprint.route('/api/user/update', methods=['PUT'])
@token_required
def update(current_user):
    data = request.get_json()

    name, email, password = data.get('name'), data.get('email'), data.get('password')

    if name is not None:
        current_user.name = name

    if email is not None:
        current_user.email = email

    if password is not None:
        current_user.password = generate_password_hash(password)
        current_user.token = None

    User.update()

    return make_response({"message": "Successfully updated."}, 201)
import jwt

from flask import request, jsonify, current_app
from functools import wraps
from .models import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()

            assert (current_user.token == token)

        except Exception as e:
            print(f"Error updating status: {str(e)}")
            return jsonify({
                'message': 'Token is invalid!'
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated

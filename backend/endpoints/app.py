import os

from flask import Flask, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

from .blueprints.post import sample_blueprint
from .blueprints.authentication import authentication_blueprint
from .blueprints.dataset import dataset_blueprint
from .blueprints.nn_architecture import nn_architecture_blueprint
from .blueprints.nn_model import nn_model_blueprint
from .blueprints.nn_prediction import nn_prediction_blueprint

from .db import db


app = Flask(__name__)


app.config['SECRET_KEY'] = 'MUN NN Toolbox Secret Key'

# Database Configuration
database_dir = os.path.join(os.path.dirname(__file__), 'instance')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(database_dir, 'db.sqlite3')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db.init_app(app)

# Uploading Dataset Configuration
datasets_dir = os.path.join(os.path.dirname(__file__), 'datasets')
app.config['DATASETS_FOLDER'] = datasets_dir

# Saved NN Model Configuration
app.config['NN_MODELS_FOLDER'] = os.path.join(os.path.dirname(__file__), 'nn_generation', 'saved_models')

# Saved NN Prediction Configuration
app.config['NN_PREDICTIONS_FOLDER'] = os.path.join(os.path.dirname(__file__), 'nn_generation', 'saved_predictions')


# CORS Policy
CORS(app)

app.register_blueprint(sample_blueprint)
app.register_blueprint(authentication_blueprint)
app.register_blueprint(dataset_blueprint)
app.register_blueprint(nn_architecture_blueprint)
app.register_blueprint(nn_model_blueprint)
app.register_blueprint(nn_prediction_blueprint)

app.app_context().push()


@app.errorhandler(Exception)
def handle_error(e):
    code = 500
    if isinstance(e, HTTPException):
        code = e.code
    return jsonify(error=str(e)), code


@app.route('/')
def hello_world():
    return 'Welcome to NN toolbox!'


if __name__ == '__main__':
    app.run()

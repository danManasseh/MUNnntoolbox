import enum

from sqlalchemy import func, DateTime
from .db import db


class BaseModel(object):

    def save(self, commit=True):
        db.session.add(self)
        if commit:
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                raise e

    @staticmethod
    def update():
        db.session.commit()

    def refresh(self):
        db.session.refresh(self)

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class User(BaseModel, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(80))
    token = db.Column(db.Text())


class Dataset(BaseModel, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), unique=True)
    file_name = db.Column(db.String(200), unique=True)
    columns = db.Column(db.Text)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


class NeuralNetworkArchitecture(BaseModel, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(120), unique=True)
    configuration = db.Column(db.JSON)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


class NeuralNetworkModelStatus(enum.Enum):
    Defined = "Defined"
    Pending = "Pending"
    Processing = "Processing"
    Completed = "Completed"
    Failed = "Failed"


class NeuralNetworkModel(BaseModel, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    nn_architecture_id = db.Column(db.Integer, db.ForeignKey('neural_network_architecture.id'), nullable=False)
    dataset_id = db.Column(db.Integer, db.ForeignKey('dataset.id'), nullable=False)
    name = db.Column(db.String(120), unique=True)
    input = db.Column(db.Text, nullable=False)
    output = db.Column(db.Text, nullable=False)
    train_percent = db.Column(db.Double, nullable=False)
    validation_percent = db.Column(db.Double, nullable=False)
    test_percent = db.Column(db.Double, nullable=False)
    status = db.Column(db.Enum(NeuralNetworkModelStatus), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())


class NeuralNetworkPredictionStatus(enum.Enum):
    Defined = "Defined"
    Pending = "Pending"
    Processing = "Processing"
    Completed = "Completed"
    Failed = "Failed"


class NeuralNetworkPrediction(BaseModel, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    nn_model_id = db.Column(db.Integer, db.ForeignKey('neural_network_model.id'), nullable=False)
    dataset_id = db.Column(db.Integer, db.ForeignKey('dataset.id'), nullable=False)
    columns = db.Column(db.Text)
    name = db.Column(db.String(120), nullable=False)
    status = db.Column(db.Enum(NeuralNetworkPredictionStatus), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())

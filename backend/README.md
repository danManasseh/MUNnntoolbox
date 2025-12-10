# Backend

This backend project is designed to interface with a frontend built with Angular. The primary purpose is to construct a back-end for training neural network models using Keras and TensorFlow based on the provided JSON schema. The training process is managed asynchronously using the Celery Python package.

## Overview

- **Model Configuration**: The system expects a JSON schema that outlines the architecture and other specifications for the neural network model.
  
- **Request Handling**: Requests are handled by Flask

- **Model Training**: Upon receiving the model configuration from the Flask endpoints, the system will initialize and train a model accordingly using Keras and TensorFlow.

- **Asynchronous Management**: Training tasks, given their potentially long-running nature, are handled asynchronously using Celery to ensure non-blocking behavior and scalability.

## Test Cases
 - **Go to the root directory**
 - **Run the following command**: `python -m unittest discover -s backend -p "test*.py"`

## Prerequisites

Ensure you have the following installed:
- Python 3.x

## Installation

## Running the Backend

The backend should now be running and ready to accept requests from the frontend.

## API Endpoints

- [readme.md](https://github.com/Memorial-ENGI9837/MUNnntoolbox/tree/main/backend/endpoints)
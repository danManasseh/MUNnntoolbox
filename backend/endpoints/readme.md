## Up and Running

1. **Open Your Flask Project:**\
Open your Flask project using your preferred integrated development environment (IDE), such as PyCharm, Visual Studio Code, or any other IDE of your choice.


2. **Set Up a Virtual Environment:**
* If you want to isolate project dependencies, it's a good practice to create a virtual environment. You can use tools like virtualenv or the IDE's built-in virtual environment manager.
* Activate the virtual environment for your project.

3. **Install Packages from requirements.txt:**
* Open a terminal or command prompt.
* Navigate to the directory where your requirements.txt file is located.
* Run the following command to install the required packages:\
```pip install -r requirements.txt```

4. **Run the Flask App:**
Select the Flask configuration or script you created in the previous step.
Execute the run command. This could be a "Run" or "Start" button or an IDE-specific keyboard shortcut.
The Flask application should start, and you can access it through a web browser using the appropriate URL (usually `http://127.0.0.1:5000/` by default).

## Test Scenario
1. **Upload Dataset:**\
* Upload dataset using this API `/api/dataset/upload`
* Upload `presentation_dataset.csv` as a sample dataset
* Can not upload datasets with same filename and name. Be careful! If you want to upload it twice change the filename and name.
* Result will be in this path `backend/endpoints/datasets/`
* Do not use other datasets randomly. The dataset have to be match with NN Architecture unless you will get errors, probably.

2. **Upload NN Architecture:**
* Upload dataset using this API `/api/nn_architecture/upload`
* Use this NN Architecture(Sample Request):
```json
{
    "name": "presentation_arch",
    "configuration": {
        "layers": [
            {
                "layer_id": 0,
                "layer_type": "Input",
                "architecture_type": "FNN",
                "units": 2,
                "activation": null
            },
            {
                "layer_id": 1,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 10,
                "activation": "relu"  
            },
            {
                "layer_id": 2,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 10,
                "activation": "relu" 
            },
            {
                "layer_id": 3,
                "layer_type": "Output",
                "architecture_type": "FNN",
                "units": 1,
                "activation": "sigmoid"
            }
        ],
        "optimizer": "Adam",
        "loss": "mean_squared_error", 
        "metrics": ["mae"]
    }
}
```
* Be careful! Use unique name for NN Architecture. If you want to upload it twice change the name.

3. **Train Model:**
* Train model using this API `/api/model/train`
* Sample Request:
```json
{
    "nn_architecture_id": 5, // Change it accordingly
    "dataset_id": 4,  // Change it accordingly
    "name": "presentation_model",
    "input": ["a", "b"],
    "output": ["y"],
    "train_percent": 0.8,
    "validation_percent": 0.1,
    "test_percent": 0.1
}
```
* Be careful! Use unique name for NN Model. If you want to upload it twice change the name.
* Result will be in this path `backend/endpoints/nn_generation/saved_models/`


4. **Create Prediction:**
* Create prediction using this API `/api/prediction/create`
* Sample Request:
```json
{
    "nn_model_id": 3,  // Change it accordingly
    "dataset_id": 5,  // Change it accordingly
    "name": "presentation_prediction",
    "columns": ["a", "b"]
}
```
* Result will be in this path `backend/endpoints/nn_generation/saved_predictions/`

## Requirements
If you add any library, add them to requirement.txt by this command:
``` pip freeze > requirements.txt ``` 
* Make sure you activate the correct Python `venv`.

## Create Database
If you make any changes in models or want to re-create the database, do the following steps:
1. Remove the current database if it exists in ```instance``` folder in ```root```.
2. Make sure you install all requirements and then run these commands:
   ```
   flask shell
   db.create_all()
   ```
   * If you want to drop all tables, run `db.drop_all()`
3. Enter ```exit()```

## MVP Endpoints Guide for Frontend Developers

### Authentication
#### Sample User
```json
{
    "email": "test@mun.ca",
    "password": "1234"
}
```
#### Test Token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNfaWQiOiJjNzdkYTA5Zi1hMThjLTRlMTEtYWYwOS1kZWUxYzY3NjJmM2QiLCJleHAiOjE3MDQ1MDg3ODJ9.m-0el0YL1WkPcnzXV81umNAadFea1dCQIP4Nt7BFVT8
* Add Key: x-access-token and Value: [above token] to header of your request.


### Dataset

#### URL: /api/dataset/upload
##### Type: POST, Validation: required

#####  Request
###### Body Type: multipart/form-data
**dataset**: upload file(you can use Postman, choose file type, and then select a file)

**name**: name for the dataset(alias)

##### Response: 
```json
{
    "id": 1,
    "name": "dataset1",
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    "file_name": "dataset1.csv",
    "columns": ["Id", "SepalLengthCm", "PetalLengthCm", "Species"],
    "created_at": "2021-06-28 16:06:30"
}
```
* time format: %Y-%m-%d %H:%M:%S

#### URL: /api/dataset/list
##### Type: GET, Validation: required

##### Response:
```json
[
   {
        "id": 1,
        "name": "dataset1",
        "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
        "file_name": "dataset1.csv",
        "columns": ["Id", "SepalLengthCm", "PetalLengthCm", "Species"],
        "created_at": "2021-06-28 16:06:30"
   }
]
```

### Model

#### URL: /api/model/train
##### Type: POST, Validation: required

##### Request:
```json
{
    "nn_architecture_id": 1,
    "dataset_id": 1,
    "name": "model name",
    "input": ["SepalLengthCm", "PetalLengthCm"],
    "output": ["Species"],
    "train_percent": 60,
    "validation_percent": 30,
    "test_percent": 10
}
```

##### Response:
```json
{
    "nn_architecture_id": 1,
    "dataset_id": 1,
    "id": 1,
    "name": "model name",
    "input": ["SepalLengthCm", "PetalLengthCm"],
    "output": ["Species"],
    "train_percent": 60,
    "validation_percent": 30,
    "test_percent": 10,
    "status": "Defined",
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    "created_at": "2021-06-28 16:06:30"
}
```
* Neural Network Model Status: {Defined ,Pending, Completed, Failed}

#### URL:  /api/model/list
##### Type: GET, Validation: required

##### Response:
```json
[
   {
        "id": 1,
        "nn_architecture_id": 1,
        "dataset_id": 1,
        "name": "model name",
        "status": "Pending",
        "input": ["SepalLengthCm", "PetalLengthCm"],
        "output": ["Species"],
        "train_percent": 60,
        "validation_percent": 30,
        "test_percent": 10,
        "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
        "created_at": "2021-06-28 16:06:30"
   }
]
```

#### URL:  /api/model/status?nn_model_id={id}
##### Type: GET, Validation: required

##### Response:
```json
{
    "id": 1,
    "name": "model name",
    "status": "Pending",
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    "created_at": "2021-06-28 16:06:30"
}
```

### Neural Network Architecture

#### URL: /api/nn_architecture/upload
##### Type: POST, Validation: required

#####  Request
```json
{
    "name": "arch1",
    "configuration": {
        "layers": [{
                "layer_id": 0,
                "layer_type": "Input",
                "architecture_type": "FNN",
                "units": 2,
                "activation": null
            },
            {
                "layer_id": 1,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 5,
                "activation": "relu"
            },
            {
                "layer_id": 2,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 2,
                "activation": "softmax"
            }
        ],
        "optimizer": "Adam",
        "loss": "categorical_crossentropy",
        "metrics": ["accuracy"]
    }
}
```
* configuration is based on NN services requirements. I did not define them :D

##### Response: 
```json
{
    "id": 1,
    "name": "arch1",
    "configuration": {
        "layers": [{
                "layer_id": 0,
                "layer_type": "Input",
                "architecture_type": "FNN",
                "units": 2,
                "activation": null
            },
            {
                "layer_id": 1,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 5,
                "activation": "relu"
            },
            {
                "layer_id": 2,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 2,
                "activation": "softmax"
            }
        ],
        "optimizer": "Adam",
        "loss": "categorical_crossentropy",
        "metrics": ["accuracy"]
    },
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    "created_at": "2021-06-28 16:06:30"
}
```

#### URL:  /api/nn_architecture/list
##### Type: GET, Validation: required

##### Response:
```json
[
   {
        "id": 1,
        "name": "arch1",
        "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
        "created_at": "2021-06-28 16:06:30"
   }
]
```

#### URL: /api/nn_architecture/edit
##### Type: POST, Validation: required

#####  Request
```json
{
   "id": 1,
    "name": "arch1",
    "configuration": {
        "layers": [{
                "layer_id": 0,
                "layer_type": "Input",
                "architecture_type": "FNN",
                "units": 2,
                "activation": null
            },
            {
                "layer_id": 1,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 5,
                "activation": "relu"
            },
            {
                "layer_id": 2,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 2,
                "activation": "softmax"
            }
        ],
        "optimizer": "Adam",
        "loss": "categorical_crossentropy",
        "metrics": ["accuracy"]
    }
}
```

##### Response: 
```json
{
    "id": 1,
    "name": "arch1",
    "configuration": {
        "layers": [{
                "layer_id": 0,
                "layer_type": "Input",
                "architecture_type": "FNN",
                "units": 2,
                "activation": null
            },
            {
                "layer_id": 1,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 5,
                "activation": "relu"
            },
            {
                "layer_id": 2,
                "layer_type": "Dense",
                "architecture_type": "FNN",
                "units": 2,
                "activation": "softmax"
            }
        ],
        "optimizer": "Adam",
        "loss": "categorical_crossentropy",
        "metrics": ["accuracy"]
    },
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    "created_at": "2021-06-28 16:06:30"
}
```

#### URL:  /api/nn_architecture/detail?nn_architecture_id={id}
##### Type: GET, Validation: required

##### Response:
```json
{
    "id": 1,
    "configuration": {
        "layers": [
            {
                "activation": null,
                "architecture_type": "FNN",
                "layer_id": 0,
                "layer_type": "Input",
                "units": 2
            },
            {
                "activation": "relu",
                "architecture_type": "FNN",
                "layer_id": 1,
                "layer_type": "Dense",
                "units": 5
            },
            {
                "activation": "softmax",
                "architecture_type": "FNN",
                "layer_id": 2,
                "layer_type": "Dense",
                "units": 2
            }
        ],
        "loss": "categorical_crossentropy",
        "metrics": [
            "accuracy"
        ],
        "optimizer": "Adam"
    },
    "created_at": "2023-10-19 03:40:39",
    "name": "arch2",
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d"
}
```

#### URL:  /api/nn_architecture/delete?nn_architecture_id={id}
##### Type: DELETE, Validation: required

##### Response:
```json
{
    "message": "Neural Architecture with ID {id} deleted successfully."
}
```

### Prediction

#### URL: /api/prediction/create
##### Type: POST, Validation: required

##### Request:
```json
{
    "nn_model_id": 2,
    "dataset_id": 1,
    "name": "prediction1",
    "columns": ["a", "b"]
}
```

##### Response:
```json
{
    "created_at": "2023-12-08 21:11:43",
    "dataset_id": 1,
    "id": 1,
    "name": "prediction1",
    "nn_model_id": 2,
    "columns": ["a", "b"],
    "status": "Completed",
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d"
}
```
* Neural Network Prediction Status {Defined ,Pending, Completed, Failed}

#### URL:  /api/prediction/list
##### Type: GET, Validation: required

##### Response:
```json
[
    {
        "created_at": "2023-12-08 21:11:43",
        "dataset_id": 1,
        "id": 1,
        "name": "prediction1",
        "nn_model_id": 2,
        "columns": ["a", "b"],
        "status": "Completed",
        "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d"
    }
]
```

#### URL:  /api/model/prediction?nn_prediction_id={id}
##### Type: GET, Validation: required

##### Response:
```json
{
    "created_at": "2023-12-08 21:11:43",
    "id": 1,
    "name": "prediction1",
    "status": "Completed",
    "user_id": "c77da09f-a18c-4e11-af09-dee1c6762f3d"
}
```

#### URL:  /api/prediction/download?nn_prediction_id={id}
##### Type: GET, Validation: required

##### Response:

```
[Prediction File Content]
```

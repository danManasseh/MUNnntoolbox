# MUNNNToolbox - Neural Network Training Platform

A comprehensive web-based platform for designing, training, and deploying neural network models without requiring deep learning expertise. Built as a Master's capstone project at Memorial University of Newfoundland.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)
[![Angular](https://img.shields.io/badge/Angular-14+-red.svg)](https://angular.io/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg)](https://www.tensorflow.org/)

---

## 🎯 Project Overview

MUNNNToolbox is an enterprise-grade neural network toolbox that democratizes machine learning by providing a user-friendly interface for individuals with little to no deep learning expertise to:

- **Design** custom neural network architectures visually
- **Train** models on custom datasets with distributed task processing
- **Deploy** trained models for predictions
- **Monitor** training progress with real-time notifications

### Key Features

✅ **Visual Architecture Designer** - Drag-and-drop interface for building neural networks  
✅ **Distributed Training** - Asynchronous task processing with Kafka and Celery  
✅ **Microservices Architecture** - Scalable, modular backend design  
✅ **Dataset Management** - Upload, validate, and manage training datasets  
✅ **Real-time Notifications** - Email alerts for training completion  
✅ **RESTful API** - Comprehensive API for all platform operations  
✅ **CI/CD Pipeline** - Automated testing and deployment with GitLab  

---

## 🏗️ Architecture

### High-Level System Architecture

```
┌─────────────┐
│   Angular   │ ◄─── User Interface (Components, Services, Models)
│  Frontend   │
└──────┬──────┘
       │ HTTPS/REST
       ▼
┌─────────────────────────────────────────────────────┐
│            Load Balancer (Kubernetes)               │
└────────┬─────────────────────────────────┬──────────┘
         │                                 │
         ▼                                 ▼
┌──────────────────┐              ┌──────────────────┐
│  Flask Request   │              │  Flask Request   │
│    Handlers      │              │    Handlers      │
└────────┬─────────┘              └────────┬─────────┘
         │                                 │
         └────────────┬─────────────────────┘
                      │
                      ▼
           ┌──────────────────────┐
           │   Apache Kafka       │
           │  Message Broker      │
           │ ┌──────────────────┐ │
           │ │ Request  Topic   │ │
           │ └──────────────────┘ │
           │ ┌──────────────────┐ │
           │ │ Response Topic   │ │
           │ └──────────────────┘ │
           └──────────┬───────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│ Celery Workers  │       │ Celery Workers  │
│  (Schedulers)   │       │  (Schedulers)   │
└────────┬────────┘       └────────┬────────┘
         │                         │
         └────────────┬─────────────┘
                      │
                      ▼
           ┌──────────────────────┐
           │  TensorFlow/Keras    │
           │  Training Services   │
           └──────────┬───────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐
│   MongoDB       │       │  Email Service  │
│  (Persistence)  │       │ (Notifications) │
└─────────────────┘       └─────────────────┘
```

### Technology Stack

#### Backend
- **Framework:** Flask (Python)
- **ML/AI:** TensorFlow, Keras
- **Message Queue:** Apache Kafka
- **Task Scheduler:** Celery
- **Database:** MongoDB
- **Container Orchestration:** Kubernetes + Docker

#### Frontend
- **Framework:** Angular 14+
- **UI Components:** Custom component library
- **State Management:** Angular Services
- **Testing:** Jasmine + Karma

#### DevOps
- **CI/CD:** GitLab CI/CD
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **Monitoring:** Custom logging + external services

---

## 🚀 Getting Started

### Prerequisites

```bash
# Backend
Python 3.8+
MongoDB 4.4+
Apache Kafka 2.8+
Redis (for Celery)

# Frontend
Node.js 14+
Angular CLI 14+
```

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd MUNNNToolbox/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration:
# - MongoDB connection string
# - Kafka broker URLs
# - Celery broker URL
# - Email service credentials
```

5. **Start Kafka and Celery**
```bash
# Start Kafka (in separate terminal)
kafka-server-start.sh config/server.properties

# Start Celery worker (in separate terminal)
celery -A celery_worker worker --loglevel=info
```

6. **Run Flask application**
```bash
python app.py
# Backend runs on http://localhost:5000
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd MUNNNToolbox/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API endpoint**
```bash
# Edit src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

4. **Run development server**
```bash
ng serve
# Frontend runs on http://localhost:4200
```

### Docker Deployment (Recommended)

```bash
# Build and run all services
docker-compose up --build

# Scale training workers
docker-compose up --scale training-worker=3
```

---

## 📖 API Documentation

### Authentication

#### Google OAuth Login
```http
POST /api/user/google-auth
Content-Type: application/json

{
  "token": "google_auth_token"
}
```

### Dataset Management

#### Upload Dataset
```http
POST /api/dataset/upload
Content-Type: multipart/form-data

file: dataset.csv
```

#### List User Datasets
```http
GET /api/dataset/list/{username}
```

#### Delete Dataset
```http
DELETE /api/dataset/delete/{datasetId}
```

### Neural Network Architecture

#### Create Architecture
```http
POST /api/nn-architecture/upload
Content-Type: application/json

{
  "userId": "user123",
  "architecture_name": "MyNetwork",
  "architecture": {
    "layers": [
      {"type": "Dense", "units": 128, "activation": "relu"},
      {"type": "Dropout", "rate": 0.5},
      {"type": "Dense", "units": 10, "activation": "softmax"}
    ]
  }
}
```

#### List Architectures
```http
GET /api/nn-architecture/list?userId=user123
```

### Model Training

#### Submit Training Job
```http
POST /api/model/train
Content-Type: application/json

{
  "architecture_id": "arch123",
  "dataset_id": "dataset456",
  "Input": "feature1,feature2,feature3",
  "Output": "target",
  "userId": "user123",
  "trainPercent": 70,
  "validationPercent": 15,
  "testPercent": 15
}
```

#### Check Training Status
```http
GET /api/model/status/{model_id}
```

#### Retrieve Trained Model
```http
GET /api/model/result/{model_id}
```

### Model Prediction

#### Submit Validation/Prediction
```http
POST /api/validation/submit
Content-Type: application/json

{
  "architecture_id": "arch123",
  "datasetName": "test_data",
  "Input": "feature1,feature2,feature3",
  "Output": "target",
  "userId": "user123"
}
```

---

## 🧪 Testing

### Backend Tests

```bash
# Run all backend tests
pytest tests/

# Run specific test file
pytest tests/test_model_builder.py

# Run with coverage
pytest --cov=src tests/
```

**Example Unit Test:**
```python
import unittest
from keras.models import Model
from nn_generation import model_builder

class TestModelBuilder(unittest.TestCase):
    def setUp(self):
        self.mock_config = {
            'layers': [
                {'type': 'Dense', 'units': 128},
                {'type': 'Dense', 'units': 64}
            ]
        }
    
    def test_build_model(self):
        model = model_builder.build_model(self.mock_config)
        self.assertIsInstance(model, Model)
        self.assertEqual(len(model.layers), len(self.mock_config['layers']))
```

### Frontend Tests

```bash
# Run all frontend tests
ng test

# Run tests with coverage
ng test --code-coverage

# Run specific test
ng test --include='**/dataset.component.spec.ts'
```

**Example Component Test:**
```typescript
describe('DatasetComponent', () => {
  let component: DatasetComponent;
  let fixture: ComponentFixture<DatasetComponent>;
  let datasetService: DatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetComponent],
      providers: [DatasetService]
    });
    
    fixture = TestBed.createComponent(DatasetComponent);
    component = fixture.componentInstance;
    datasetService = TestBed.inject(DatasetService);
  });

  it('should upload a valid CSV file', () => {
    // Test implementation
    expect(component.uploadFile()).toBeTruthy();
  });
});
```

---

## 🗄️ Database Schema

### Users Collection
```javascript
{
  "_id": ObjectId,
  "username": String,
  "email": String,
  "password_hash": String,
  "auth_token": String,
  "created_at": Date
}
```

### Datasets Collection
```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "name": String,
  "path": String,
  "upload_date": Date,
  "metadata": {
    "rows": Number,
    "columns": Array,
    "size": Number
  }
}
```

### Model Architectures Collection
```javascript
{
  "_id": ObjectId,
  "user_id": ObjectId,
  "architecture_name": String,
  "configuration": Object,
  "creation_date": Date
}
```

### Training Tasks Collection
```javascript
{
  "_id": ObjectId,
  "model_name": String,
  "user_id": ObjectId,
  "dataset_id": ObjectId,
  "architecture_id": ObjectId,
  "status": String, // "Pending", "Processing", "Complete", "Failed"
  "result_path": String,
  "metrics": {
    "accuracy": Number,
    "loss": Number,
    "val_accuracy": Number,
    "val_loss": Number
  },
  "start_time": Date,
  "end_time": Date
}
```

---

## 🔒 Security Features

- **HTTPS/TLS:** All communications encrypted
- **OAuth 2.0:** Secure authentication via Google
- **Password Hashing:** bcrypt for credential storage
- **JWT Tokens:** Stateless authentication
- **Input Validation:** Sanitization against injection attacks
- **RBAC:** Role-based access control
- **Data Encryption:** At-rest encryption for sensitive data

---

## 📊 System Workflow

### Complete Training Workflow

1. **User uploads dataset** (CSV format)
   - Frontend validates file format
   - Backend stores in MongoDB
   - Dataset metadata extracted

2. **User designs/selects architecture**
   - Visual drag-and-drop interface
   - Configuration saved as JSON
   - Architecture validation

3. **User initiates training**
   - Selects dataset + architecture
   - Specifies input/output columns
   - Defines train/validation/test split

4. **Backend processes request**
   - Flask handler receives request
   - Publishes to Kafka Request Topic
   - Returns acknowledgment to user

5. **Celery worker picks up task**
   - Subscribes to Kafka topic
   - Schedules training job
   - Allocates compute resources

6. **TensorFlow trains model**
   - Loads dataset from MongoDB
   - Builds model from architecture
   - Trains with specified parameters
   - Tracks metrics (loss, accuracy)

7. **Results stored and user notified**
   - Model saved to MongoDB
   - Results published to Kafka Response Topic
   - Email notification sent to user
   - Frontend updates with link to results

8. **User retrieves trained model**
   - Downloads model weights
   - Views training metrics
   - Can use for predictions

---

## 🎓 Academic Context

**Project:** Master's Capstone Project  
**Institution:** Memorial University of Newfoundland  
**Program:** Master of Science (M.Sc.) in Computer Software Engineering  
**Duration:** Fall 2023 - Spring 2024  
**Team Size:** 6 members  

### Team Contributions

This project was developed collaboratively by a team of six graduate students:

**Backend Team:**
- Microservices architecture design
- RESTful API implementation
- Kafka message queue integration
- Celery task scheduling
- TensorFlow/Keras model training pipeline
- Database design and management
- CI/CD pipeline configuration

**Frontend Team:**
- Angular application architecture
- Component development (Dataset, Architecture, Training, Prediction)
- API service integration
- Visual architecture designer
- User authentication flow
- Responsive UI/UX design

**My Role:** Backend Development Lead
- Designed microservices architecture
- Implemented Flask API endpoints
- Integrated Kafka for asynchronous processing
- Developed Celery task scheduling system
- Built TensorFlow/Keras training pipeline
- Configured CI/CD with GitLab
- Wrote comprehensive API documentation

### Project Highlights

📄 **32-page technical design report**  
🏗️ **Microservices architecture** with Kubernetes orchestration  
⚡ **Distributed task processing** with Kafka and Celery  
🧠 **Neural network training platform** powered by TensorFlow  
🔧 **RESTful API** with 25+ endpoints  
✅ **Comprehensive test suite** (unit, integration, system tests)  
🚀 **GitLab CI/CD pipeline** for automated deployment  

---

## 🛠️ Future Enhancements

### Planned Features

- [ ] **Additional Kafka layers** for better task segmentation
- [ ] **Advanced model architectures** (CNN, RNN, Transformer support)
- [ ] **Hyperparameter tuning** with AutoML
- [ ] **Model versioning** and experiment tracking
- [ ] **Advanced monitoring** with Prometheus/Grafana
- [ ] **GPU acceleration** for faster training
- [ ] **Model deployment** as REST APIs
- [ ] **Collaborative features** for team projects
- [ ] **Pre-trained model zoo** for transfer learning

---

## 📝 License

This project was developed as part of academic research at Memorial University of Newfoundland.

---

## 👥 Contributors

- **Murad Shahsuvarov**
- **Jehad Abualhassan**
- **Bahador Najivandzadeh**
- **Prabin Kumar Shrestha**
- **Daniel Manasseh** (Backend Lead)
- **Hussein El Samad**

**Supervisor:** Reza Shahidi  
**Institution:** Memorial University of Newfoundland  
**Course:** Software Engineering Capstone (Fall 2023)

---

## 📧 Contact

**Daniel Manasseh Ofei Kwafo**  
Email: danielmanasseh100@gmail.com  
LinkedIn: www.linkedin.com/in/dmok0797  
Location: St. John's, NL, Canada

---

## 🙏 Acknowledgments

- Memorial University of Newfoundland Computer Science Department
- Our project supervisor and advisors
- Open-source communities (Flask, TensorFlow, Angular, Kafka)

---

## 📚 Documentation

Full technical documentation available in:
- `/docs/design-report.pdf` - Complete 32-page design document
- `/docs/api-reference.md` - Comprehensive API documentation
- `/docs/architecture.md` - Detailed architecture diagrams
- `/docs/user-guide.md` - End-user documentation

---

**Built with ❤️ by the MUNNNToolbox Team at Memorial University**

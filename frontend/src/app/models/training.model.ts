
export class BaseTrainingModel {
  id:number = 0;
  name: string= '';
  user_id?:string= '';
}
export class TrainingModel extends BaseTrainingModel{
  nn_architecture_id: number = 0;
  dataset_id: number = 0;
  input?: string[]=[];
  output?: string[]=[];
  train_percent: number = 0;
  validation_percent: number= 0;
  test_percent: number= 0;
  status:string= 'Pending';
  created_at: Date= new Date();
}

export const Statuses: { 
  [key: string]: { name: string; color: string } } = 
  {
  Pending: { name: 'Pending', color: 'orange' },
  Completed: { name: 'Completed', color: 'green' },
  Failed: { name: 'Failed', color: 'red' },
};

export class DataSet  extends BaseTrainingModel{
  columns?: string[];
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const sampleTrainingData: TrainingModel[] = [
  {
    id: 1,
    name: 'Model training 1',
    nn_architecture_id: 1,
    dataset_id: 1,
    input: ['Input 1'],
    train_percent: 0.5,
    validation_percent: 0.2,
    test_percent: 0.3,
    status: 'Completed',
    user_id: "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    created_at: new Date()
  },
  {
    id: 2,
    name: 'Model training 2',
    nn_architecture_id: 2,
    dataset_id: 2,
    input: ['Input 2'],
    train_percent: 0.4,
    validation_percent: 0.25,
    test_percent: 0.35,
    status: 'Completed',
    user_id: "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    created_at: yesterday
  },
  {
    id: 3,
    name: 'Model training 3',
    nn_architecture_id: 3,
    dataset_id: 3,
    input: ['Input 3'],
    train_percent: 0.4,
    validation_percent: 0.5,
    test_percent: 0.1,
    status: 'Failed',
    user_id: "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    created_at: yesterday
  }
];

export const sampleArchitectures = [
  {
    id: 1,
    name: 'Architecture 1',
  },
  {
    id: 2,
    name: 'Architecture 2',
  },
  {
    id: 3,
    name: 'Architecture 3',
  }
];

export const sampleDatasets: DataSet[] = [
  {
    id: 1,
    name: 'Dataset 1',
    columns: ['Input 1', 'Output 1']
  },
  {
    id: 2,
    name: 'Dataset 2',
    columns: [ 'Input 2', 'Output 2']
  },
  {
    id: 3,
    name: 'Dataset 3',
    columns: [ 'Input 3', 'Output 3']
  }
];

export const sampleNewTrainingData = {
  id: 4,
  name: 'New Training',
  nn_architecture_id: 1,
  dataset_id: 1,
  train_percent: 0.6,
  validation_percent: 0.2,
  test_percent: 0.2,
  status: 'Pending',
  created_at: new Date()
};
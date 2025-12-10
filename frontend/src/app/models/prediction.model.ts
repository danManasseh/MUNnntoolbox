
export class BasePredictionModel {
  id:number = 0;
  name: string= '';
  user_id?:string= '';
}
export class PredictionModel extends BasePredictionModel{
  nn_model_id: number = 0;
  dataset_id: number = 0;
  columns_id?: string[]=[];
  status:string= 'Pending';
  created_at: Date= new Date();
}

export const Statuses: { 
  [key: string]: { name: string; color: string } } = 
  {
  Pending: { name: 'Pending', color: 'orange' },
  Completed: { name: 'Completed', color: 'green' },
  Failed: { name: 'Failed', color: 'red' },
  Defined: { name: 'Defined', color: 'blue' },
};

export class DataSet  extends BasePredictionModel{
  columns?: string[];
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const samplePredictionData: PredictionModel[] = [
  {
    id: 1,
    name: 'Prediction 1',
    nn_model_id: 1,
    dataset_id: 1,
    columns_id: ['Input 1'],
    status: 'Completed',
    user_id: "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    created_at: new Date()
  },
  {
    id: 2,
    name: 'Prediction 2',
    nn_model_id: 2,
    dataset_id: 2,
    columns_id: [ 'Output 2'],
    status: 'Completed',
    user_id: "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    created_at: yesterday
  },
  {
    id: 3,
    name: 'Prediction 3',
    nn_model_id: 3,
    dataset_id: 3,
    columns_id: ['Input 3'],
    status: 'Failed',
    user_id: "c77da09f-a18c-4e11-af09-dee1c6762f3d",
    created_at: yesterday
  }
];

export const sampleModels = [
  {
    id: 1,
    name: 'Model Training 1',
  },
  {
    id: 2,
    name: 'Model Training 2',
  },
  {
    id: 3,
    name: 'Model Training 3',
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

export const sampleNewPredictionData = {
  id: 4,
  name: 'New Prediction',
  nn_model_id: 1,
  dataset_id: 1,
  columns_id: ['Input 1', 'Output 1'],
  status: 'Pending',
  created_at: new Date()
};
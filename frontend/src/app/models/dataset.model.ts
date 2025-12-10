

export class DatasetModel  {
  id: string = ''
  name: string = ''
  userId: string = ''
  file_name: string = '';
  columns: string[] = [];
  created_at: Date = new Date();
}

export class DatasetAddModel  {
  name: string = '';
  dataset: any = null;
}

export const getSampleDataset: DatasetModel[] = [
  {
  
  
    id: '1',
    name: 'Sample Dataset 1',
    userId: 'sample-user-id',
    file_name: 'sample_dataset_1.csv',
    columns: ['Column1', 'Column2'],
    created_at: new Date(),
  
  
}
]
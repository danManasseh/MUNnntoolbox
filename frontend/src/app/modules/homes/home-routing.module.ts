import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component'; // Replace with the actual path to your HomeComponent
import { DatasetComponent } from '../datasets/dataset.component';
import { ArchitectureComponent } from '../architectures/architecture.component';
import { TrainingComponent } from '../trainings/training.component';
import { PredictionComponent } from '../predictions/prediction.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent, // This can be your default tab or landing page
    children: [
      { path: 'dataset', component: DatasetComponent },
      { path: 'architecture', component: ArchitectureComponent },
      { path: 'training', component: TrainingComponent },
      { path: 'prediction', component: PredictionComponent },
      // Set a default route or redirectTo if needed
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}


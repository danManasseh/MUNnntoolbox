import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule} from '@angular/material/tabs';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { DatasetModule } from '../datasets/dataset.module';
import { TrainingModule } from '../trainings/training.module';
import { ArchitectureModule } from '../architectures/architecture.module';
import { PredictionModule } from '../predictions/prediction.module';

@NgModule({
  declarations: [HomeComponent, ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, MatTabsModule, DatasetModule, TrainingModule, ArchitectureModule, PredictionModule ], 
  providers: [],
})
export class HomeModule {}

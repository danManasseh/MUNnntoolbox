import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { TrainingRoutingModule } from './training-routing.module';
import {CreateTrainingService} from './create-training/create-training.service';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [TrainingComponent, CreateTrainingComponent],
  imports: [CommonModule, TrainingRoutingModule, SharedModule],
  exports: [TrainingComponent, CreateTrainingComponent],
  providers: [CreateTrainingService],
})
export class TrainingModule {}

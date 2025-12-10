import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictionComponent } from './prediction.component';
import { CreatePredictionComponent } from './create-prediction/create-prediction.component';
import { PredictionRoutingModule } from './prediction-routing.module';
import {CreatePredictionService} from './create-prediction/create-prediction.service';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [PredictionComponent, CreatePredictionComponent],
  imports: [CommonModule, PredictionRoutingModule, SharedModule],
  exports: [PredictionComponent, CreatePredictionComponent],
  providers: [CreatePredictionService],
})
export class PredictionModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, homeGuard } from './auth.guard';

/** Lazy loading every modules */
const routes: Routes = [
  {
    path: 'dummy',
    loadChildren: () =>
      import('./modules/dummies/dummy.module').then((m) => m.DummyModule),
    canActivate: [authGuard]
  },
  {
    path: 'training',
    loadChildren: () =>
      import('./modules/trainings/training.module').then((m) => m.TrainingModule),
    canActivate: [authGuard]
  },
  {
    path: 'architecture',
    loadChildren: () =>
      import('./modules/architectures/architecture.module').then((m) => m.ArchitectureModule),
    canActivate: [authGuard]
  },
  {
    path: 'dataset',
    loadChildren: () =>
      import('./modules/datasets/dataset.module').then((m) => m.DatasetModule),
    canActivate: [authGuard]
  },
  {
    path: 'prediction',
    loadChildren: () =>
      import('./modules/predictions/prediction.module').then((m) => m.PredictionModule),
    canActivate: [authGuard]
  },
  {
    path: 'auths',
    loadChildren: () =>
      import('./modules/auths/auth.module').then((m) => m.AuthModule),
    canActivate: [homeGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/homes/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

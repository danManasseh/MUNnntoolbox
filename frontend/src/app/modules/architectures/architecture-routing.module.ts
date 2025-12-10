import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchitectureComponent } from './architecture.component';
import { ArchitectureDesignComponent } from './designs/architecture-design.component';
import { ArchitectureListComponent } from './list/architecture-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ArchitectureComponent,
    children: [
      {
        path: 'list',
        component: ArchitectureListComponent,
      },
      {
        path: 'design',
        component: ArchitectureDesignComponent,
      },
      {
        path: '',
        component: ArchitectureListComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchitectureRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchitectureRoutingModule } from './architecture-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { ArchitectureDesignComponent } from './designs/architecture-design.component';
import { ArchitectureComponent } from './architecture.component';
import { ArchitectureListComponent } from './list/architecture-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ArchitectureComponent,
    ArchitectureListComponent,
    ArchitectureDesignComponent,
  ],
  imports: [
    CommonModule,
    ArchitectureRoutingModule,
    SharedModule,
    RouterModule
  ],
exports: [ArchitectureComponent,
  ArchitectureListComponent,
  ArchitectureDesignComponent,],

  providers: [],
})
export class ArchitectureModule {}

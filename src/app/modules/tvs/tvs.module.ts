import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { TVsRoutingModule } from './tvs-routing.module';
import { TVsComponent } from './pages/tvs/tvs.component';


@NgModule({
  declarations: [
    TVsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    TVsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class TVsModule { }

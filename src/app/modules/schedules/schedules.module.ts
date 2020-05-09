import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { SchedulesPageComponent } from './pages';


@NgModule({
  declarations: [
    // Pages
    SchedulesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    SchedulesRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class SchedulesModule { }

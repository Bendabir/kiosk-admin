import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsPageComponent } from './pages';


@NgModule({
  declarations: [
    // Pages
    GroupsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    GroupsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class GroupsModule { }

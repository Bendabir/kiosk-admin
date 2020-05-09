import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsPageComponent } from './pages';


@NgModule({
  declarations: [
    // Pages
    ContentsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    ContentsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class ContentsModule { }

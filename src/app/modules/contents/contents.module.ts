import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsPageComponent } from './pages';
import { ContentCardComponent } from './parts';


@NgModule({
  declarations: [
    // Pages
    ContentsPageComponent,

    // Parts
    ContentCardComponent
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

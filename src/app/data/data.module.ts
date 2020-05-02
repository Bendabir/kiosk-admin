import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsService, GroupsService, TVsService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ContentsService,
    GroupsService,
    TVsService
  ]
})
export class DataModule { }

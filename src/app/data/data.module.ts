import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsService, FilesService, GroupsService, TVsService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ContentsService,
    FilesService,
    GroupsService,
    TVsService
  ]
})
export class DataModule { }

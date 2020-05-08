import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { FilesRoutingModule } from './files-routing.module';
import { FilesPageComponent } from './pages';


@NgModule({
  declarations: [
    // Pages
    FilesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    FilesRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class FilesModule { }

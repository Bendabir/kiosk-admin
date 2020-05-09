import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { FilesRoutingModule } from './files-routing.module';
import { FilesPageComponent } from './pages';
import { UploadFileDialogComponent } from './dialogs';


@NgModule({
  declarations: [
    // Pages
    FilesPageComponent,

    // Dialogs
    UploadFileDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    FilesRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    UploadFileDialogComponent
  ]
})
export class FilesModule { }

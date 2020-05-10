import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsPageComponent } from './pages';
import { ContentCardComponent } from './parts';
import { EditContentDialogComponent } from './dialogs';


@NgModule({
  declarations: [
    // Pages
    ContentsPageComponent,

    // Parts
    ContentCardComponent,

    // Dialogs
    EditContentDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    ContentsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    EditContentDialogComponent
  ]
})
export class ContentsModule { }

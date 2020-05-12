import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsPageComponent } from './pages';
import { ContentCardComponent } from './parts';
import { AddContentDialogComponent, EditContentDialogComponent } from './dialogs';


@NgModule({
  declarations: [
    // Pages
    ContentsPageComponent,

    // Parts
    ContentCardComponent,

    // Dialogs
    AddContentDialogComponent,
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
    AddContentDialogComponent,
    EditContentDialogComponent
  ]
})
export class ContentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { TVsRoutingModule } from './tvs-routing.module';
import { TVsPageComponent } from './pages';
import { TVCardComponent } from './parts';
import { EditTVDialogComponent } from './dialogs';


@NgModule({
  declarations: [
    // Pages
    TVsPageComponent,

    // Parts
    TVCardComponent,

    // Dialogs
    EditTVDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    TVsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    EditTVDialogComponent
  ]
})
export class TVsModule { }

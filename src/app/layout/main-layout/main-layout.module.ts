import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { MainLayoutComponent } from './main-layout.component';
import { SettingsDialogComponent } from './dialogs';
import { ActionsService } from './services';

@NgModule({
  declarations: [
    MainLayoutComponent,

    // Parts

    // Dialogs
    SettingsDialogComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [],
  entryComponents: [
    SettingsDialogComponent
  ],
  providers: [
    ActionsService
  ]
})
export class MainLayoutModule { }

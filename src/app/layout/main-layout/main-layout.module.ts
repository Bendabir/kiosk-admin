import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { MainLayoutComponent } from './main-layout.component';
import { SettingsDialogComponent } from './dialogs/settings-dialog/settings-dialog.component';

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
  ]
})
export class MainLayoutModule { }

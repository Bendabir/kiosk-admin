import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { LoaderComponent, SplashComponent } from './components';
import { ConfirmationDialogComponent } from './dialogs';
import { DurationPipe, OrNAPipe } from './pipes';


@NgModule({
  declarations: [
    DurationPipe,
    OrNAPipe,

    // Misc components
    SplashComponent,
    LoaderComponent,

    // Dialogs
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,

    MaterialModule,
    FlexLayoutModule,

    DurationPipe,
    OrNAPipe,

    LoaderComponent,
    SplashComponent,

    ConfirmationDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }

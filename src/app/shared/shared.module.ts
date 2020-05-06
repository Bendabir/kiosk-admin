import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { LabeledSliderComponent, LoaderComponent, SplashComponent } from './components';
import { ConfirmationDialogComponent } from './dialogs';
import { DurationPipe, OrNAPipe } from './pipes';


@NgModule({
  declarations: [
    DurationPipe,
    OrNAPipe,

    // Misc components
    LabeledSliderComponent,
    LoaderComponent,
    SplashComponent,

    // Dialogs
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    FlexLayoutModule,

    DurationPipe,
    OrNAPipe,

    LabeledSliderComponent,

    LoaderComponent,
    SplashComponent,

    ConfirmationDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }

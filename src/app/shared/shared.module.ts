import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { DurationPipe, OrNAPipe } from './pipes';
import { SplashComponent } from './components';


@NgModule({
  declarations: [
    DurationPipe,
    OrNAPipe,

    SplashComponent
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

    SplashComponent
  ]
})
export class SharedModule { }

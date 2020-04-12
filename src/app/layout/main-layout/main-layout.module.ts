import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { MainLayoutComponent } from './main-layout.component';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,

    SharedModule
  ],
  exports: [
    CommonModule,

    MainLayoutComponent
  ]
})
export class MainLayoutModule { }

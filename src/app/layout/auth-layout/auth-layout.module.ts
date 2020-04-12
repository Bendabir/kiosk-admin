import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { AuthLayoutComponent } from './auth-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,

    SharedModule
  ],
  exports: [
    CommonModule,

    AuthLayoutComponent
  ]
})
export class AuthLayoutModule { }

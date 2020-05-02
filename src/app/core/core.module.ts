import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { APIService, AuthService, SettingsService } from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    APIService,
    AuthService,
    SettingsService
  ]
})
export class CoreModule { }

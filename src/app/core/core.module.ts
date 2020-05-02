import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { APIService, AuthService, SettingsService, SnackBarService } from './services';
import { APIKeyInterceptor } from './interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    APIService,
    AuthService,
    SettingsService,
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIKeyInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }

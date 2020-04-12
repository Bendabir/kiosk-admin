import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@modules/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthLayoutModule } from '@layout/auth-layout';
import { MainLayoutModule } from '@layout/main-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,

    // 3rd party
    AuthModule,

    // Core & Shared
    CoreModule,
    SharedModule,

    // Layouts
    AuthLayoutModule,
    MainLayoutModule,

    // App
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

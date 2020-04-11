import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core.module';
import { SharedModule } from '@shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthLayoutComponent } from '@layout/auth-layout';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent
  ],
  imports: [
    // Angular
    BrowserModule,

    // Core & Shared
    CoreModule,
    SharedModule,

    // App
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

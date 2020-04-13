import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { SettingsService } from '@app/services';
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
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  private classTheme: string = null;

  constructor(
    private overlayContainer: OverlayContainer,
    private settingsService: SettingsService
  ) {
    this.classTheme = this.settingsService.getThemeClass();
    const container = this.overlayContainer.getContainerElement();

    container.classList.add('mat-typography');
    container.classList.add(this.classTheme);

    this.settingsService.getObservableSettings().subscribe((settings) => {
      container.classList.remove(this.classTheme);
      this.classTheme = SettingsService.classFromTheme(settings.theme);
      container.classList.add(this.classTheme);
    });
  }
}

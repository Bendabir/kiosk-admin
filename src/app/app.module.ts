import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { CoreModule } from '@app';
import { Settings } from '@app/models';
import { SettingsService } from '@app/services';
import { AuthLayoutModule, MainLayoutModule } from '@layout';
import { AuthModule } from '@modules/auth';
import { SharedModule } from '@shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


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
      this.classTheme = Settings.themeClass(settings.theme);
      container.classList.add(this.classTheme);
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Locale, Settings, Theme } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  static LS_FIELD = 'settings';
  static DEFAULT_SETTINGS: Settings = {
    theme: Theme.LIGHT,
    locale: Locale.en_US,
    identifyDuration: 5000,
    forwardDuration: 5000,
    rewindDuration: 5000
  };

  private settings: BehaviorSubject<Settings>;

  public static classFromTheme(theme: Theme): string {
    switch (theme) {
      case Theme.DARK: return 'kiosk-dark-theme';
      default: return 'kiosk-light-theme';
    }
  }

  constructor() {
    const settings = localStorage.getItem(SettingsService.LS_FIELD);

    this.settings = new BehaviorSubject<Settings>(
      settings !== null ? JSON.parse(settings) : SettingsService.DEFAULT_SETTINGS
    );
  }

  public setSettings(settings: Settings) {
    this.settings.next(settings);
    localStorage.setItem(SettingsService.LS_FIELD , JSON.stringify(settings));
  }

  public getSettings(): Observable<Settings> {
    return this.settings;
  }

  public getThemeClass(): string {
    return SettingsService.classFromTheme(this.settings.value.theme);
  }
}

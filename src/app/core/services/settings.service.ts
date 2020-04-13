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

  public getObservableSettings(): Observable<Settings> {
    return this.settings;
  }

  public getSettings(): Settings {
    return this.settings.value;
  }

  public getThemeClass(): string {
    return Settings.themeClass(this.settings.value.theme);
  }
}

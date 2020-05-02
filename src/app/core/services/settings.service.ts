import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Settings } from '../models';

@Injectable()
export class SettingsService {
  static LS_FIELD = 'settings';

  private settings: BehaviorSubject<Settings>;

  constructor() {
    const settings = localStorage.getItem(SettingsService.LS_FIELD);

    this.settings = new BehaviorSubject<Settings>(
      settings !== null ? JSON.parse(settings) : Settings.DEFAULT
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

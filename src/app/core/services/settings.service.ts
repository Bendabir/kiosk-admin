import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Settings } from '../models';
import { SnackBarService } from '../services';

@Injectable()
export class SettingsService {
  static LS_FIELD = 'settings';

  private _settings: BehaviorSubject<Settings>;
  private snackBarService: SnackBarService;

  constructor() {
    const settings = localStorage.getItem(SettingsService.LS_FIELD);

    this._settings = new BehaviorSubject<Settings>(
      settings !== null ? Object.assign(new Settings(), JSON.parse(settings)) : Settings.DEFAULT
    );
  }

  public getObservableSettings(): Observable<Settings> {
    return this._settings;
  }

  public get settings(): Settings {
    return this._settings.value;
  }

  public set settings(settings: Settings) {
    this._settings.next(settings);
    localStorage.setItem(SettingsService.LS_FIELD , JSON.stringify(settings));

    this.snackBarService.showInfo('Updated settings.');
  }

  public getThemeClass(): string {
    return Settings.themeClass(this._settings.value.theme);
  }

  public bindSnackBarService(service: SnackBarService) {
    this.snackBarService = service;
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SettingsService } from '../services';

@Injectable()
export class SnackBarService {
  private settingsService: SettingsService;

  constructor(private snackBar: MatSnackBar) { }

  showError(message: string) {
    // Error will be always shown, no matter the settings
    this.snackBar.open(message, 'DISMISS', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }

  /** Display a snack-bar notification. If the feature is disabled in the settings,
   *  the notification won't show. However, it's possible to force the notification.
   */
  showInfo(message: string, force: boolean = false) {
    if (this.settingsService.settings.snacksEnabled || force) {
      this.snackBar.open(message, 'OK', {
        duration: 2000
      });
    }
  }

  bindSettingsService(service: SettingsService) {
    this.settingsService = service;
  }
}

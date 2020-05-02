import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Locale, Settings, Theme } from '@app/models';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent {
  public LOCALES = Object.values(Locale);
  public THEMES = Object.values(Theme);
  public settings: Settings = null;
  public hideClientKey = true;

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.settings = data.settings;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  localeName(locale: Locale): string {
    return Settings.localeName(locale);
  }
}

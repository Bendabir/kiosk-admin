import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '@env';
import { AuthService, SettingsService } from '@app/services';
import { Breakpoint } from '@app/models';

import { SettingsDialogComponent } from './dialogs';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(
    public settingsDialog: MatDialog,
    private authService: AuthService,
    private settingsService: SettingsService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate([
      environment.routes.login
    ]);
  }

  openSettings() {
    this.settingsDialog.open(SettingsDialogComponent, {
      width: '640px',
      data: {
        settings: this.settingsService.getSettings()
      }
    }).afterClosed().subscribe(result => {
      // Save the settings
      if (result) {
        this.settingsService.setSettings(result);
      }
    });
  }

  isSmallScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return width <= Breakpoint.MD;
  }
}

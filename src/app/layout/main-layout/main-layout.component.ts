import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { MatDialog, MatSidenav } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { environment } from '@env';
import { AuthService, SettingsService } from '@app/services';
import { Breakpoint } from '@app/models';

import { SettingsDialogComponent } from './dialogs';
import { ActionItem, ActionsService } from './services';
import { Observable } from 'rxjs';

const ACTIONS_TOOLBAR_HEIGHT = '48px';
const TRANSITION = transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'));

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('expandActionsToolbar', [
      state('collapsed', style({
        height: '0',
        minHeight: '0',
        borderBottom: 'none'
      })),
      state('expanded', style({
        height: ACTIONS_TOOLBAR_HEIGHT
      })),
      TRANSITION
    ]),
    trigger('adjustContentHeight', [
      state('collapsed', style({
        height: '100%'
      })),
      state('expanded', style({
        height: `calc(100% - ${ACTIONS_TOOLBAR_HEIGHT})`
      })),
      TRANSITION
    ])
  ]
})
export class MainLayoutComponent implements OnInit {
  public sideNavOpened = true;
  @ViewChild('sideNav', {
    static: true
  }) public sideNav: MatSidenav;
  public actionsToolbarExpanded = true;
  public actionsEnabled$: Observable<boolean>;
  public actions$: Observable<ActionItem[]>;

  public NAV_ITEMS: any[] = [{
    link: '/home/screens',
    icon: 'tvs',
    title: 'Screens'
  }, {
    link: '/home/groups',
    icon: 'group_work',
    title: 'Groups'
  }, {
    link: '/home/contents',
    icon: 'subscriptions',
    title: 'Contents'
  }, {
    link: '/home/schedules',
    icon: 'schedule',
    title: 'Schedules'
  }, {
    link: '/home/files',
    icon: 'insert_drive_file',
    title: 'Files'
  }];

  private resize(width: number): void {
    this.sideNav.fixedTopGap = 55;
    this.sideNavOpened = !this.isSmallScreen(width);
  }

  constructor(
    public settingsDialog: MatDialog,
    private authService: AuthService,
    private settingsService: SettingsService,
    private actionsService: ActionsService,
    private router: Router
  ) {
    // Dynamically inject the actions in the toolbar
    this.actions$ = this.actionsService.actions$;
    this.actionsEnabled$ = this.actionsService.actionsEnabled$;

    // Hide the toolbar when actions are disabled
    this.actionsService.actionsEnabled$.subscribe(enabled => {
      this.actionsToolbarExpanded = enabled;
    });
  }

  ngOnInit() {
    this.resize(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize(event.target.innerWidth);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([
      environment.routes.login
    ]);
  }

  openSettings() {
    this.settingsDialog.open(SettingsDialogComponent, {
      width: '640px',
      autoFocus: false,
      data: {
        settings: this.settingsService.settings
      }
    }).afterClosed().subscribe(result => {
      // Save the settings
      if (result) {
        this.settingsService.settings = result;
      }
    });
  }

  isSmallScreen(width: number = null): boolean {
    if (width === null) {
      width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    return width <= Breakpoint.SM;
  }

  toggleActionsToolbar() {
    this.actionsToolbarExpanded = !this.actionsToolbarExpanded;
  }

  actionsToolbarStatus() {
    return this.actionsToolbarExpanded ? 'expanded' : 'collapsed';
  }
}

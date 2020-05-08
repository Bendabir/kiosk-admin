import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, ErrorObserver } from 'rxjs';

import { ActionType, TV } from '@data/schemas';
import { TVsService } from '@data/services';
import { ActionButton, ActionDivider, ActionsService } from '@layout/main-layout/services';
import { Splash } from '@shared/models';

import { AddTVDialogComponent } from '../../dialogs';

@Component({
  selector: 'app-tvs-page',
  templateUrl: './tvs-page.component.html',
  styleUrls: ['./tvs-page.component.scss']
})
export class TVsPageComponent implements OnInit {
  noTVSplash: Splash = {
    icon: 'tv',
    title: 'No screen',
    message: 'Declare a screen and it will show up here.',
    button: {
      action: this.create.bind(this),
      title: 'Declare screen'
    }
  };
  errorSplash: Splash;
  tvs$: BehaviorSubject<TV[]>;

  // For observables callbacks
  private doNothingOnError: ErrorObserver<any> = {
    error: (_: any) => {}
  };

  constructor(
    private dialog: MatDialog,
    private tvsService: TVsService,
    private actionsService: ActionsService
  ) { }

  ngOnInit() {
    // Load the global actions to the toolbar
    this.actionsService.actions = [
      new ActionButton('add', 'Create screen', this.create.bind(this)),
      new ActionDivider(),
      new ActionButton('refresh', 'Reload all screens', this.reloadAll.bind(this)),
      new ActionButton('search', 'Identify all screens', this.identifyAll.bind(this)),
      new ActionDivider(),
      new ActionButton('sync', 'Refresh', this.reload.bind(this))
    ];

    this.reload();
  }

  reload() {
    this.errorSplash = null;
    this.tvs$ = null;
    this.tvsService.getAll(true, false).subscribe({
      next: (tvs: TV[]) => {
        this.tvs$ = new BehaviorSubject<TV[]>(tvs);
      },
      error: err => {
        const message = this.tvsService.extractMessage(err);
        this.errorSplash = Splash.errorSplash(message, {
          action: this.reload.bind(this),
          title: 'Retry'
        });
      }
    });
  }

  create() {
    this.dialog.open(AddTVDialogComponent, {
      width: '640px',
      autoFocus: false,
      data: {}
    }).afterClosed().subscribe(tv => {
      if (tv) {
        this.tvsService.addOne(tv, true).subscribe({
          next: (addedTV: TV) => {
            const tvs = this.tvs$.value;

            tvs.push(addedTV);

            this.tvs$.next(tvs);
          },
          error: (_) => {} // Do nothing on error
        });
      }
    });
  }

  identifyAll() {
    this.tvsService.triggerActionAll(ActionType.IDENTIFY).subscribe(this.doNothingOnError);
  }

  reloadAll() {
    this.tvsService.triggerActionAll(ActionType.RELOAD).subscribe(this.doNothingOnError)
  }
}

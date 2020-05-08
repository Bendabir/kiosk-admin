import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

import { SnackBarService } from '@app/services';
import { TV } from '@data/schemas';
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

  constructor(
    private dialog: MatDialog,
    private tvsService: TVsService,
    private snackBarService: SnackBarService,
    private actionsService: ActionsService
  ) { }

  ngOnInit() {
    // Load the global actions to the toolbar
    this.actionsService.actions = [
      new ActionButton('add', 'Create screen', this.create.bind(this)),
      new ActionDivider(),
      new ActionButton('sync', 'Refresh', this.reload.bind(this))
    ];

    this.reload();
  }

  reload() {
    this.errorSplash = null;
    this.tvs$ = null;
    this.tvsService.getAll(true).subscribe(tvs => {
      this.tvs$ = new BehaviorSubject<TV[]>(tvs);
    }, err => {
      const message = this.tvsService.extractMessage(err);
      this.errorSplash = Splash.errorSplash(message, {
        action: this.reload.bind(this),
        title: 'Retry'
      });
    });
  }

  create() {
    this.dialog.open(AddTVDialogComponent, {
      width: '640px',
      autoFocus: false,
      data: {}
    }).afterClosed().subscribe(tv => {
      if (tv) {
        this.tvsService.addOne(tv, true).subscribe(addedTV => {
          const tvs = this.tvs$.value;

          tvs.push(addedTV);

          this.tvs$.next(tvs);
        }, err => {
          const message = this.tvsService.extractMessage(err);

          this.snackBarService.showError(`Error creating screen : ${message}`);
        });
      }
    });
  }
}

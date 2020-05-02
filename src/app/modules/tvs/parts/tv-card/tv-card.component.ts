import { Component, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { SnackBarService } from '@app/services';
import { TV } from '@data/schemas';
import { TVsService } from '@data/services';
import { ConfirmationDialogComponent } from '@shared/dialogs';

import { EditTVDialogComponent } from '../../dialogs';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss']
})
export class TVCardComponent {
  static NON_BREAKING_SPACE = '\u00A0';

  private _tv: TV;

  get tv(): TV {
    return this._tv;
  }

  @Input()
  set tv(tv: TV) {
    // Create a proper object from the data to insure we have the methods
    this._tv = Object.assign(new TV(), tv);
  }

  @HostBinding('class.deleted') public deleted = false;

  constructor(
    private dialog: MatDialog,
    private tvsService: TVsService,
    private snackBarService: SnackBarService
  ) { }

  get group(): string {
    if (this.tv.group === null || typeof this.tv.group === 'string') {
      return TVCardComponent.NON_BREAKING_SPACE;
    } else if (this.tv.group.displayName) {
      return this.tv.group.displayName;
    } else {
      return TVCardComponent.NON_BREAKING_SPACE;
    }
  }

  private handleError(topMessage: string, err: any): Observable<TV> {
    const message = this.tvsService.extractMessage(err);
    const errorMessage = `${topMessage} '${this.tv.displayName}' : ${message}`;

    this.snackBarService.showError(errorMessage);

    return of(null);
  }

  toggleActive() {
    this.tvsService.updateOne(this.tv.flatten(), true).pipe(
      // Extract server response and load it into the component
      tap(data => {
        this.tv = data;

        const message = `Toggled TV '${this.tv.displayName}'.`;

        this.snackBarService.showInfo(message);
      }),
      catchError(this.handleError.bind(this, 'Error toggling TV'))
    ).subscribe();
  }

  identify() {
    console.log('TODO : TV identification.');
  }

  refresh() {
    console.log('TODO : TV refresh.');
  }

  edit() {
    this.dialog.open(EditTVDialogComponent, {
      width: '640px',
      data: {
        tv: this.tv
      }
    }).afterClosed().subscribe(tv => {
      // Result if a flatten data (group and content are IDs)
      if (tv) {
        this.tvsService.updateOne(tv, true).pipe(
          // Extract server response and load it into the component
          tap(data => {
            this.tv = data;

            this.snackBarService.showInfo(`Edited TV '${this.tv.displayName}'.`);
          }),
          catchError(this.handleError.bind(this, 'Error editing TV'))
        ).subscribe();
      }
    });
  }

  delete() {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '640px',
      data: {
        title: 'Delete TV',
        titleAccent: this._tv.displayName,
        message: 'You\'re about to delete this TV forever, which is a long time. Are you willing to continue ?',
        button: {
          color: 'warn',
          title: 'Delete'
        }
      }
    }).afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.tvsService.deleteOne(this._tv).pipe(
          // Not really deleting the data from the view, just hiding it
          tap(_ => {
            this.deleted = true;

            this.snackBarService.showInfo(`Deleted TV '${this.tv.displayName}'.`);
          }),
          catchError(this.handleError.bind(this, 'Error deleting TV'))
        ).subscribe();
      }
    });
  }
}

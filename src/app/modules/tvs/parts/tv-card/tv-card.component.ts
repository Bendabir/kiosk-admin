import { Component, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SnackBarService } from '@app/services';
import { TV, ActionType } from '@data/schemas';
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
  public playing = true;

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

  private handleError(topMessage: string, err: any) {
    const message = this.tvsService.extractMessage(err);
    const errorMessage = `${topMessage} '${this.tv.displayName}' : ${message}`;

    this.snackBarService.showError(errorMessage);
  }

  toggleActive() {
    this.tvsService.updateOne(this.tv.flatten(), true).subscribe(tv => {
      this.tv = tv;

      const verb = this.tv.active ? 'Enabled' : 'Disabled';
      const message = `${verb} screen '${this.tv.displayName}'.`;

      this.snackBarService.showInfo(message);
    }, this.handleError.bind(this, 'Error toggling screen'));
  }

  identify() {
    this.tvsService.triggerAction(this.tv, ActionType.IDENTIFY).subscribe(_ => {
      const message = `Identified screen '${this.tv.displayName}'.`;

      this.snackBarService.showInfo(message);
    }, this.handleError.bind(this, 'Error identifying screen'));
  }

  refresh() {
    this.tvsService.triggerAction(this.tv, ActionType.RELOAD).subscribe(_ => {
      const message = `Refreshed screen '${this.tv.displayName}'.`;

      this.snackBarService.showInfo(message);
    }, this.handleError.bind(this, 'Error refreshing screen'));
  }

  edit() {
    this.dialog.open(EditTVDialogComponent, {
      width: '640px',
      autoFocus: false,
      data: {
        tv: this.tv
      }
    }).afterClosed().subscribe(tv => {
      // Result if a flatten data (group and content are IDs)
      if (tv) {
        this.tvsService.updateOne(tv, true).subscribe(updatedTV => {
            this.tv = updatedTV;

            this.snackBarService.showInfo(`Edited screen '${this.tv.displayName}'.`);
        }, this.handleError.bind(this, 'Error editing screen'));
      }
    });
  }

  delete() {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '640px',
      autoFocus: false,
      data: {
        title: 'Delete screen',
        titleAccent: this.tv.displayName,
        message: 'You\'re about to delete this screen forever, which is a long time. Are you willing to continue ?',
        button: {
          color: 'warn',
          title: 'Delete'
        }
      }
    }).afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.tvsService.deleteOne(this.tv).subscribe(_ => {
          // Not really deleting the data from the view, just hiding it
          this.deleted = true;

          this.snackBarService.showInfo(`Deleted screen '${this.tv.displayName}'.`);
        }, this.handleError.bind(this, 'Error deleting screen'));
      }
    });
  }

  togglePlay() {
    this.playing = !this.playing;

    const action = this.playing ? ActionType.PLAY : ActionType.PAUSE;

    this.tvsService.triggerAction(this.tv, action).subscribe(_ => {
      const message = `${this.playing ? 'Played' : 'Paused'} screen '${this.tv.displayName}'.`;

      this.snackBarService.showInfo(message);
    }, this.handleError.bind(this, 'Error playing/pausing screen'));
  }

  rewind() {
    this.tvsService.triggerAction(this.tv, ActionType.REWIND).subscribe(_ => {
      const message = `Rewinded screen '${this.tv.displayName}'.`;

      this.snackBarService.showInfo(message);
    }, this.handleError.bind(this, 'Error rewinding screen'));
  }

  forward() {
    this.tvsService.triggerAction(this.tv, ActionType.FORWARD).subscribe(_ => {
      const message = `Forwarded screen '${this.tv.displayName}'.`;

      this.snackBarService.showInfo(message);
    }, this.handleError.bind(this, 'Error forwarding screen'));
  }
}

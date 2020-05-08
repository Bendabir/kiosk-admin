import { Component, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NextObserver, ErrorObserver } from 'rxjs';

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

  // For observables callbacks
  private doNothingOnError: ErrorObserver<any> = {
    error: (_: any) => {}
  };

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

  toggleActive() {
    // Custom messages for this call
    this.tvsService.updateOne(this.tv.flatten(), true, false).subscribe({
      next: (tv: TV) => {
        this.tv = tv;

        const verb = this.tv.active ? 'Enabled' : 'Disabled';
        const message = `${verb} screen '${this.tv.displayName}'.`;

        this.snackBarService.showInfo(message);
      },
      error: (err: any) => {
        const verb = this.tv.active ? 'enabling' : 'disabling';
        const message = this.tvsService.extractMessage(err);
        this.snackBarService.showError(`Error ${verb} screen '${this.tv.displayName}' : ${message}`);

        // Fixing the value
        this.tv.active = !this.tv.active;
      }
    });
  }

  identify() {
    this.tvsService.triggerAction(this.tv, ActionType.IDENTIFY).subscribe(this.doNothingOnError);
  }

  refresh() {
    this.tvsService.triggerAction(this.tv, ActionType.RELOAD).subscribe(this.doNothingOnError);
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
        this.tvsService.updateOne(tv, true).subscribe({
          next: (updatedTV: TV) => {
            this.tv = updatedTV;
          },
          error: this.doNothingOnError.error
        });
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
        this.tvsService.deleteOne(this.tv).subscribe({
          next: (deleted: boolean) => {
            this.deleted = deleted;
          },
          error: this.doNothingOnError.error
        });
      }
    });
  }

  togglePlay() {
    this.playing = !this.playing;

    const action = this.playing ? ActionType.PLAY : ActionType.PAUSE;

    this.tvsService.triggerAction(this.tv, action).subscribe(this.doNothingOnError);
  }

  rewind() {
    this.tvsService.triggerAction(this.tv, ActionType.REWIND).subscribe(this.doNothingOnError);
  }

  forward() {
    this.tvsService.triggerAction(this.tv, ActionType.FORWARD).subscribe(this.doNothingOnError);
  }
}

import { Component, Input, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorObserver } from 'rxjs';

import { Content, ContentType, TV } from '@data/schemas';
import { ContentsService } from '@data/services';
import { ConfirmationDialogComponent } from '@shared/dialogs';

import { EditContentDialogComponent } from '../../dialogs';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent {
  private _content: Content;

  get content(): Content {
    return this._content;
  }

  @Input()
  set content(content: Content) {
    this._content = Object.assign(new Content(), content);
  }

  @HostBinding('class.deleted') public deleted = false;

  // For observables callbacks
  private doNothingOnError: ErrorObserver<any> = {
    error: (_: any) => {}
  };

  constructor(
    private dialog: MatDialog,
    private contentsService: ContentsService
  ) { }

  get thumbnail(): string {
    return this.content.thumbnail ? this.content.thumbnail : TV.NO_THUMBNAIL_PATH;
  }

  get uri(): string {
    switch (this.content.type) {
      case ContentType.TEXT: return null;
      default: return this.content.uri;
    }
  }

  edit() {
    this.dialog.open(EditContentDialogComponent, {
      width: '640px',
      autoFocus: false,
      data: {
        content: this.content
      }
    }).afterClosed().subscribe(content => {
      if (content) {
        this.contentsService.updateOne(content).subscribe({
          next: (updatedContent: Content) => {
            this.content = updatedContent;
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
        title: 'Delete content',
        titleAccent: this.content.displayName,
        message: 'You\'re about to delete this content forever, which is a long time. Are you willing to continue ?',
        button: {
          color: 'warn',
          title: 'Delete'
        }
      }
    }).afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.contentsService.deleteOne(this.content).subscribe({
          next: (deleted: boolean) => {
            this.deleted = deleted;
          },
          error: this.doNothingOnError.error
        });
      }
    });
  }
}

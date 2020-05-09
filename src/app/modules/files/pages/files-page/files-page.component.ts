import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, ErrorObserver } from 'rxjs';

import { SnackBarService } from '@app/services';
import { File } from '@data/schemas';
import { FilesService } from '@data/services';
import { ActionButton, ActionDivider, ActionsService } from '@layout/main-layout/services';
import { Splash } from '@shared/models';
import { ConfirmationDialogComponent } from '@shared/dialogs';

import { UploadFileDialogComponent } from '../../dialogs';

@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {
  noFileSplash: Splash = {
    icon: 'insert_drive_file',
    title: 'No file',
    message: 'Upload a file and it will show up here.',
    button: {
      action: this.upload.bind(this),
      title: 'Upload file'
    }
  };
  errorSplash: Splash;
  files$: BehaviorSubject<File[]>;

  // For observables callbacks
  private doNothingOnError: ErrorObserver<any> = {
    error: (_: any) => {}
  };

  // TODO : Sort actions
  // TODO : Create content from file

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private filesService: FilesService,
    private actionsService: ActionsService
  ) {
    this.actionsService.actions = [
      new ActionButton('cloud_upload', 'Upload file', this.upload.bind(this)),
      new ActionDivider(),
      new ActionButton('sync', 'Refresh', this.reload.bind(this))
    ];
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.errorSplash = null;
    this.files$ = null;
    this.filesService.getAll(false).subscribe({
      next: (files: File[]) => {
        this.files$ = new BehaviorSubject<File[]>(files);
      },
      error: err => {
        const message = this.filesService.extractMessage(err);
        this.errorSplash = Splash.errorSplash(message, {
          action: this.reload.bind(this),
          title: 'Retry'
        });
      }
    });
  }

  upload() {
    this.dialog.open(UploadFileDialogComponent, {
      width: '640px',
      autoFocus: false
    }).afterClosed().subscribe(file => {
      if (file) {
        this.filesService.uploadOne(file).subscribe({
          next: (uploadedFile: File) => {
            const files = this.files$.value;

            files.push(uploadedFile);

            this.files$.next(files);
          },
          error: this.doNothingOnError.error
        });
      }
    });
  }

  delete(file: File) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '640px',
      autoFocus: false,
      data: {
        title: 'Delete file',
        titleAccent: file.filename,
        message: 'You\'re about to delete this file forever, which is a long time. Are you willing to continue ?',
        button: {
          color: 'warn',
          title: 'Delete'
        }
      }
    }).afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.filesService.deleteOne(file).subscribe({
          next: (deleted: boolean) => {
            if (deleted) {
              // Remove the file from the list
              const files = this.files$.value;

              this.files$.next(files.filter(f => f.filename !== file.filename));
            }
          },
          error: this.doNothingOnError.error
        });
      }
    });
  }

  link(filename: string): string {
    return this.filesService.link(filename);
  }

  copyToClipboard(link: string) {
    // TODO : Use Clipboard from CDK in Angular 9
    const box = document.createElement('textarea');
    box.style.opacity = '0';
    box.value = link;
    document.body.appendChild(box);
    box.select();
    document.execCommand('copy');
    document.body.removeChild(box);

    this.snackBarService.showInfo('Copied link to clipboard !');
  }
}

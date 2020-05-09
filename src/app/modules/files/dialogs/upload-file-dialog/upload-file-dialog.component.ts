import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { environment as env } from '@env';

@Component({
  selector: 'app-upload-file-dialog',
  templateUrl: './upload-file-dialog.component.html',
  styleUrls: ['./upload-file-dialog.component.scss']
})
export class UploadFileDialogComponent {
  public MAX_SIZE = env.server.maxFileSize;
  public fileToUpload: globalThis.File = null;

  constructor(
    private dialogRef: MatDialogRef<UploadFileDialogComponent>
  ) { }

  onNoClick() {
    this.dialogRef.close();
  }

  handleFileInput(files: globalThis.FileList) {
    if (files.length > 0) {
      this.fileToUpload = files.item(0);
    } else {
      this.fileToUpload = null;
    }
  }

  get filename(): string {
    if (this.fileToUpload) {
      return this.fileToUpload.name;
    } else {
      return 'No file selected';
    }
  }
}

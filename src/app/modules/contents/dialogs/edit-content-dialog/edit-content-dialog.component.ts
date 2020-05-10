import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Content } from '@data/schemas';

@Component({
  selector: 'app-edit-content-dialog',
  templateUrl: './edit-content-dialog.component.html',
  styleUrls: ['./edit-content-dialog.component.scss']
})
export class EditContentDialogComponent {
  public content: Content;

  constructor(
    private dialogRef: MatDialogRef<EditContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.content = Object.assign(new Content(), data.content); // Work on a copy
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

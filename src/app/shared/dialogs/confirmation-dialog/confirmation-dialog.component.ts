import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ConfirmationButton {
  color: string | null;
  title: string | null;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  public title: string;
  public titleAccent: string | null;
  public message: string;
  public button: ConfirmationButton;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.title = data.title || 'Confirmation';
    this.titleAccent = data.titleAccent;
    this.message = data.message || 'Are you willing to proceed ?';
    this.button = data.button || {
      color: 'accent',
      title: 'Yes'
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

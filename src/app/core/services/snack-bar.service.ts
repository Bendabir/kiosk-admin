import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) { }

  showError(message: string) {
    this.snackBar.open(message, 'DISMISS', {
      duration: 5000
    });
  }

  showInfo(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000
    });
  }
}

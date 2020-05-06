import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SnackBarService } from '@app/services';
import { Content, ContentType, Group, TV } from '@data/schemas';
import { ContentsService, GroupsService } from '@data/services';

@Component({
  selector: 'app-edit-tv-dialog',
  templateUrl: './edit-tv-dialog.component.html',
  styleUrls: ['./edit-tv-dialog.component.scss']
})
export class EditTVDialogComponent {
  public tv: TV;
  public contentsByType$: BehaviorSubject<Map<ContentType, Content[]>>;
  public groups$: BehaviorSubject<Group[]>;

  constructor(
    private dialogRef: MatDialogRef<EditTVDialogComponent>,
    private contentsService: ContentsService,
    private groupsService: GroupsService,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.tv = data.tv.flatten(); // Working on a copy
    this.contentsService.getAll().pipe(
      catchError(err => {
        const message = this.contentsService.extractMessage(err);

        this.snackBarService.showError(`Error fetching contents : ${message}`);

        return of([]);
      })
    ).subscribe(contents => {
      const grouped = ContentsService.groupContentsByType(contents);

      this.contentsByType$ = new BehaviorSubject(grouped);
    });
    this.groupsService.getAll().pipe(
      catchError(err => {
        const message = this.groupsService.extractMessage(err);

        this.snackBarService.showError(`Error fetching groups : ${message}`);

        return of([]);
      })
    ).subscribe(groups => {
      this.groups$ = new BehaviorSubject(groups);
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  prettifyContentType(type: ContentType): string {
    return Content.prettifyType(type);
  }
}

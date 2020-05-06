import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SnackBarService } from '@app/services';
import { Content, ContentType, Group, TV } from '@data/schemas';
import { ContentsService, GroupsService } from '@data/services';

@Component({
  selector: 'app-add-tv-dialog',
  templateUrl: './add-tv-dialog.component.html',
  styleUrls: ['./add-tv-dialog.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class AddTVDialogComponent {
  private static NB_STEPS = 2;

  public tv: TV;
  public contentsByType$: BehaviorSubject<Map<ContentType, Content[]>>;
  public groups$: BehaviorSubject<Group[]>;

  constructor(
    private dialogRef: MatDialogRef<AddTVDialogComponent>,
    private contentsService: ContentsService,
    private groupsService: GroupsService,
    private snackBarService: SnackBarService
  ) {
    this.tv = new TV();
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

  hasPrevious(stepper: MatStepper) {
    return stepper.selectedIndex > 0;
  }

  hasNext(stepper: MatStepper) {
    return stepper.selectedIndex < AddTVDialogComponent.NB_STEPS - 1;
  }
}

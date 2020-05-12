import { Component } from '@angular/core';
import { MatDialogRef, MatStepper } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BehaviorSubject } from 'rxjs';

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
    private groupsService: GroupsService
  ) {
    this.tv = new TV();
    this.contentsByType$ = new BehaviorSubject(new Map([]));
    this.groups$ = new BehaviorSubject([]);
    this.contentsService.getAll().subscribe({
      next: (contents: Content[]) => {
        const grouped = ContentsService.groupContentsByType(contents);

        this.contentsByType$.next(grouped);
      },
      error: _ => {
        this.contentsByType$.next(new Map([]));
      }
    });
    this.groupsService.getAll().subscribe({
      next: (groups: Group[]) => {
        this.groups$.next(groups);
      },
      error: _ => {
        this.groups$.next([]);
      }
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

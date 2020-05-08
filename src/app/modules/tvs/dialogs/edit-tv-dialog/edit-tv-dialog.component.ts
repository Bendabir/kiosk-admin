import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

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
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.tv = data.tv.flatten(); // Working on a copy
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
}

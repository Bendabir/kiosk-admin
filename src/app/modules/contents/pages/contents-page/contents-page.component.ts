import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

import { Content, ContentType, ContentIcon } from '@data/schemas';
import { ContentsService } from '@data/services';
import { ActionButton, ActionDivider, ActionsService } from '@layout/main-layout/services';
import { Splash } from '@shared/models';

import { AddContentDialogComponent } from '../../dialogs';

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  styleUrls: ['./contents-page.component.scss']
})
export class ContentsPageComponent implements OnInit {
  types = Content.ACTIVATED_TYPES;
  currentTab = ContentType.IMAGE;
  noContentSplash: Splash = {
    icon: 'subscriptions',
    title: 'No content',
    message: 'Add a content and it will show up here.',
    button: {
      action: this.create.bind(this),
      title: 'Add content'
    }
  };
  errorSplash: Splash;
  contents$: BehaviorSubject<Content[]>;

  constructor(
    private dialog: MatDialog,
    private contentsService: ContentsService,
    private actionsService: ActionsService
  ) {
    this.actionsService.actions = [
      new ActionButton('add', 'Add content', this.create.bind(this)),
      new ActionDivider(),
      new ActionButton('sync', 'Refresh', this.reload.bind(this))
    ];
  }

  ngOnInit() {
    this.reload();
  }

  tabIcon(type: ContentType): ContentIcon {
    return Content.icon(type);
  }

  prettifyType(type: ContentType): string {
    return Content.prettifyType(type);
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.currentTab = this.types[event.index];
    this.reload();
  }

  reload() {
    this.errorSplash = null;
    this.contents$ = null;
    this.contentsService.getAllByType(this.currentTab, false).subscribe({
        next: (contents: Content[]) => {
          this.contents$ = new BehaviorSubject<Content[]>(contents);
        },
        error: err => {
          const message = this.contentsService.extractMessage(err);
          this.errorSplash = Splash.errorSplash(message, {
            action: this.reload.bind(this),
            title: 'Retry'
          });
        }
    });
  }

  create() {
    this.dialog.open(AddContentDialogComponent, {
      width: '640px',
      autoFocus: false
    }).afterClosed().subscribe(content => {
      if (content) {
        this.contentsService.addOne(content).subscribe({
          next: (addedContent: Content) => {
            const contents = this.contents$.value;

            contents.push(addedContent);

            this.contents$.next(contents);
          },
          error: _ => {} // Do nothing on error
        });
      }
    });
  }
}

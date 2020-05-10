import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

import { Content, ContentType } from '@data/schemas';
import { ContentsService } from '@data/services';
import { ActionButton, ActionDivider, ActionsService } from '@layout/main-layout/services';
import { Splash } from '@shared/models';

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  styleUrls: ['./contents-page.component.scss']
})
export class ContentsPageComponent implements OnInit {
  private _types = Content.ACTIVATED_TYPES;
  tabs = this._types.map(Content.prettifyType);
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

  onTabChanged(event: MatTabChangeEvent) {
    this.currentTab = this._types[event.index];
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
    console.log('TODO : Content creation.');
  }
}

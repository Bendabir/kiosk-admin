import { Component, Input } from '@angular/core';

import { Content, ContentType, TV } from '@data/schemas';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent {
  private _content: Content;

  get content(): Content {
    return this._content;
  }

  @Input()
  set content(content: Content) {
    this._content = Object.assign(new Content(), content);
  }

  constructor() { }

  get thumbnail(): string {
    return this.content.thumbnail ? this.content.thumbnail : TV.NO_THUMBNAIL_PATH;
  }

  get uri(): string {
    switch (this.content.type) {
      case ContentType.TEXT: return null;
      default: return this.content.uri;
    }
  }

  edit() {
    console.log('TODO : Content edition');
  }

  delete() {
    console.log('TODO : Content deletion');
  }
}

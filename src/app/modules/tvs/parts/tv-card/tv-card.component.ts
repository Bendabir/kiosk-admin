import { Component, OnInit, Input } from '@angular/core';

import { TV } from '@data/schemas/tv';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss']
})
export class TvCardComponent implements OnInit {
  static NON_BREAKING_SPACE = '\u00A0';

  @Input() tv: TV;

  constructor() { }

  ngOnInit() {
  }

  get group(): string {
    if (this.tv.group === null || typeof this.tv.group === 'string') {
      return TvCardComponent.NON_BREAKING_SPACE;
    } else if (this.tv.group.displayName) {
      return this.tv.group.displayName;
    } else {
      return TvCardComponent.NON_BREAKING_SPACE;
    }
  }

  identify() {
    console.log('TODO : TV identification.');
  }

  refresh() {
    console.log('TODO : TV refresh.');
  }

  edit() {
    console.log('TODO : TV edition.');
  }

  delete() {
    console.log('TODO : TV deletion.');
  }
}

import { Component, OnInit } from '@angular/core';

import { TV } from '@data/schemas/tv';
import { Splash } from '@shared/models';
import { tvs } from '@data/mocks';

@Component({
  selector: 'app-tvs-page',
  templateUrl: './tvs-page.component.html',
  styleUrls: ['./tvs-page.component.scss']
})
export class TVsPageComponent implements OnInit {
  // tvs: TV[] = tvs;
  tvs: TV[] = [];
  splash: Splash = {
    icon: 'tv',
    title: 'No TV',
    message: 'Declare a TV and it will show up here.',
    button: {
      action: this.create.bind(this),
      title: 'Declare TV'
    }
  };

  constructor() { }

  ngOnInit() {
  }

  create() {
    console.log('TODO : TV creation.');
  }
}

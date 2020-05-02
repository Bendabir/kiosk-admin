import { Component, OnInit } from '@angular/core';

import { TV } from '@data/schemas/tv';
import { tvs } from '@data/mocks';

@Component({
  selector: 'app-tvs-page',
  templateUrl: './tvs-page.component.html',
  styleUrls: ['./tvs-page.component.scss']
})
export class TVsPageComponent implements OnInit {
  tvs: TV[] = tvs;

  constructor() { }

  ngOnInit() {
  }

}

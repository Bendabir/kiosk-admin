import { Component, OnInit } from '@angular/core';

import { TV } from '@data/schemas/tv';

@Component({
  selector: 'app-tvs-page',
  templateUrl: './tvs-page.component.html',
  styleUrls: ['./tvs-page.component.scss']
})
export class TVsPageComponent implements OnInit {
  public tv: TV = {
    id: 'display_name',
    displayName: 'Display Name',
    description: null,
    active: true,
    on: true,
    screenSize: '1920x1080',
    machine: 'Linux x86_64',
    ip: '127.0.0.1',
    version: '3.0.0',
    brightness: 1.0,
    muted: true,
    volume: 1.0,
    showTitle: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: null,
    group: {
      id: 'home',
      displayName: 'Home',
      description: null,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  } as TV;

  constructor() { }

  ngOnInit() {
  }

}

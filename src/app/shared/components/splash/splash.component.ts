import { Component, OnInit, Input } from '@angular/core';

import { Splash } from '../../models';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  @Input()
  splash: Splash; // Data to attach

  constructor() { }

  ngOnInit() {
  }

}

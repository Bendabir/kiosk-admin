import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TV } from '@data/schemas';
import { TVsService } from '@data/services';
import { Splash } from '@shared/models';

@Component({
  selector: 'app-tvs-page',
  templateUrl: './tvs-page.component.html',
  styleUrls: ['./tvs-page.component.scss']
})
export class TVsPageComponent implements OnInit {
  noTVSplash: Splash = {
    icon: 'tv',
    title: 'No TV',
    message: 'Declare a TV and it will show up here.',
    button: {
      action: this.create.bind(this),
      title: 'Declare TV'
    }
  };
  errorSplash: Splash;
  tvs$: Observable<TV[]>;

  constructor(
    private tvsService: TVsService
  ) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.errorSplash = null;
    this.tvs$ = this.tvsService.getAll(true).pipe(
      catchError(err => {
        const message = this.tvsService.extractMessage(err);
        this.errorSplash = Splash.errorSplash(message, {
          action: this.reload.bind(this),
          title: 'Retry'
        });

        return throwError(err);
      })
    );
  }

  create() {
    console.log('TODO : TV creation.');
  }
}

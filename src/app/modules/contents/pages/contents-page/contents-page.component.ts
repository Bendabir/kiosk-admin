import { Component } from '@angular/core';

import { ActionsService } from '@layout/main-layout/services';

@Component({
  selector: 'app-contents-page',
  templateUrl: './contents-page.component.html',
  styleUrls: ['./contents-page.component.scss']
})
export class ContentsPageComponent {

  constructor(
    private actionsService: ActionsService
  ) {
    this.actionsService.disableActions();
  }
}

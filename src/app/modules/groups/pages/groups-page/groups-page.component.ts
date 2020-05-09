import { Component } from '@angular/core';

import { ActionsService } from '@layout/main-layout/services';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent {

  constructor(
    private actionsService: ActionsService
  ) {
    this.actionsService.disableActions();
  }
}

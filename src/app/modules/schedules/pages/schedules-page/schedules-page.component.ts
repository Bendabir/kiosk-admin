import { Component } from '@angular/core';

import { ActionsService } from '@layout/main-layout/services';

@Component({
  selector: 'app-schedules-page',
  templateUrl: './schedules-page.component.html',
  styleUrls: ['./schedules-page.component.scss']
})
export class SchedulesPageComponent {

  constructor(
    private actionsService: ActionsService
  ) {
    this.actionsService.disableActions();
  }
}

import { Component, OnInit } from '@angular/core';

import { ActionsService } from '@layout/main-layout/services';

@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss']
})
export class FilesPageComponent implements OnInit {

  constructor(
    private actionsService: ActionsService
  ) {
    this.actionsService.disableActions();
  }

  ngOnInit() {
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { TVsRoutingModule } from './tvs-routing.module';
import { TVsPageComponent } from './pages/tvs-page/tvs-page.component';
import { TvCardComponent } from './parts/tv-card/tv-card.component';


@NgModule({
  declarations: [
    TVsPageComponent,
    TvCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    TVsRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class TVsModule { }

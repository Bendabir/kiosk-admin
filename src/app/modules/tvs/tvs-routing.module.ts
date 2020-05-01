import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TVsPageComponent } from './pages/tvs-page/tvs-page.component';

const routes: Routes = [{
  path: '',
  component: TVsPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TVsRoutingModule { }

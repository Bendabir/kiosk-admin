import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TVsComponent } from './pages/tvs/tvs.component';

const routes: Routes = [{
  path: '',
  component: TVsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TVsRoutingModule { }

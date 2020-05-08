import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilesPageComponent } from './pages';

const routes: Routes = [{
  path: '',
  component: FilesPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }

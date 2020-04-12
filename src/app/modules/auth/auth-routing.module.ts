import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [{
  path: '',
  redirectTo: environment.routes.home,
  pathMatch: 'full'
}, {
  path: '',
  children: [{
    path: 'login',
    component: LoginComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

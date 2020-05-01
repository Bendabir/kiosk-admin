import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [{
  path: '',
  redirectTo: environment.routes.home,
  pathMatch: 'full'
}, {
  path: '',
  children: [{
    path: 'login',
    component: LoginPageComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

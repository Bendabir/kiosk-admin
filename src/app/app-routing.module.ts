import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from '@layout/auth-layout';


const routes: Routes = [{
  path: '',
  redirectTo: '/auth/login',
  pathMatch: 'full'
}, {
  path: 'auth',
  component: AuthLayoutComponent,
  loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule)
}, {
  // Fallback when no prior routes is matched
  path: '**',
  redirectTo: '/auth/login',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

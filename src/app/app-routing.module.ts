import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/guards';
import { AuthLayoutComponent, MainLayoutComponent } from '@layout';
import { environment } from '@env';


const routes: Routes = [{
  path: '',
  redirectTo: environment.routes.home,
  pathMatch: 'full'
}, {
  path: 'home',
  component: MainLayoutComponent,
  canActivate: [
    AuthGuard
  ],
  children: [{
    path: '',
    redirectTo: environment.routes.home,
    pathMatch: 'full'
  }, {
    path: 'screens',
    loadChildren: () => import('@modules/tvs').then(m => m.TVsModule)
  }, {
    path: 'groups',
    loadChildren: () => import('@modules/groups').then(m => m.GroupsModule)
  }, {
    path: 'files',
    loadChildren: () => import('@modules/files').then(m => m.FilesModule)
  }]
}, {
  path: 'auth',
  component: AuthLayoutComponent,
  loadChildren: () => import('@modules/auth').then(m => m.AuthModule)
}, {
  // Fallback when no prior routes is matched
  path: '**',
  redirectTo: environment.routes.home,
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

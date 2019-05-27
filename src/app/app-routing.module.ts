import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinalComponent} from './final/final.component';
import {NgxPermissionsGuard} from 'ngx-permissions';

const routes: Routes = [
  {
    path:'',
    loadChildren:'./pages/pages.module#PagesModule',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'USER',
        redirectTo: '/auth'
      }
    }
  } ,
  {
    path:'auth',
    loadChildren:'./authentication/authentication.module#AuthenticationModule',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'GUEST',
        redirectTo: '/'
      }
    }
  },
  {
    path:'final_submit',
    component:FinalComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: 'USER',
        redirectTo: '/auth'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import {FormsModule} from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children:[
      {
        path:'signin',
        component:LoginComponent
      },
      {
        path:'signup',
        component:NewaccountComponent
      },
    ]
  },
  // {
  // 	path: '**',
  // 	redirectTo: '404',
  // 	pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [AuthenticationComponent, LoginComponent, NewaccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class AuthenticationModule { }

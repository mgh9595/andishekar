import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import {HttpClientModule} from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children:[
      {
        path:'',
        redirectTo:'login'
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:NewaccountComponent
      },
      {
        path:'forgetPass',
        component:ForgetPassComponent
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
  declarations: [AuthenticationComponent, LoginComponent, NewaccountComponent, ForgetPassComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }

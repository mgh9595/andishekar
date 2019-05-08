import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import {RouterModule, Routes} from '@angular/router';
import { MapComponent } from './map/map.component';
import {AgmCoreModule} from '@agm/core';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
  },
  // {
  // 	path: '**',
  // 	redirectTo: '404',
  // 	pathMatch: 'full'
  // }
];

@NgModule({
  declarations: [PagesComponent, MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),


  ]
})
export class PagesModule { }

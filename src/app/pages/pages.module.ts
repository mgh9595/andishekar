import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import {RouterModule, Routes} from '@angular/router';
import { MapComponent } from './map/map.component';
import {AgmCoreModule} from '@agm/core';
import { SlidemenuComponent } from './slidemenu/slidemenu.component';
import { BottommenuComponent } from './bottommenu/bottommenu.component';
import {ClickOutsideModule} from 'ng-click-outside';
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
  declarations: [PagesComponent, MapComponent, SlidemenuComponent, BottommenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),AgmCoreModule.forRoot({apiKey:'AIzaSyAQCD8vjNyFMY4pwH1bE2fYdM0t1v4rdNw'}),
    ClickOutsideModule


  ]
})
export class PagesModule { }

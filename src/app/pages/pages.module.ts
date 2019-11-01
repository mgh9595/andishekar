import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DriverComments, GetNamePlaceDialog, PagesComponent, Show_Result} from './pages.component';
import {RouterModule, Routes} from '@angular/router';
import { MapComponent } from './map/map.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {DialogContentExampleDialog, driverdetails, SlidemenuComponent} from './slidemenu/slidemenu.component';
import { BottommenuComponent } from './bottommenu/bottommenu.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {MatButtonToggleModule, MatDialogModule, MatFormFieldModule} from '@angular/material';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {RatingComponent} from '../core/rating/rating.component';
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
  declarations: [PagesComponent, RatingComponent,MapComponent, SlidemenuComponent, BottommenuComponent,DialogContentExampleDialog,driverdetails,GetNamePlaceDialog,Show_Result,DriverComments],
  entryComponents:[DialogContentExampleDialog,driverdetails,GetNamePlaceDialog,Show_Result,DriverComments],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiSwitchModule,
    MatDialogModule,
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatGoogleMapsAutocompleteModule,
    RouterModule.forChild(routes),AgmCoreModule.forRoot({apiKey:'AIzaSyDPzCK4K50P-YmYZ2AxEQO9Yb2KWXqlyYQ',
      libraries: ['places']}),
    ClickOutsideModule


  ],providers:[GoogleMapsAPIWrapper]
})
export class PagesModule { }

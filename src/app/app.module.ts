import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FinalComponent } from './final/final.component';
import {NgxPermissionsModule, NgxPermissionsService} from 'ngx-permissions';
import {PermissionService} from './services/permission.service';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    FinalComponent
  ],
  imports: [ 
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot()
  ],
  providers: [    {
    provide: APP_INITIALIZER,
    useFactory: (ds: PermissionService, ps: NgxPermissionsService  ) => function() { console.log('dcdc');return ds.load().then(res=>{console.log(res);return ps.loadPermissions(res)})},
    deps: [PermissionService,NgxPermissionsService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

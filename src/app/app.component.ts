import { Component } from '@angular/core';
import {LatLngLiteral} from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Andishekar';
  lat: number = 51.678418;
  lng: number = 7.809007;
  paths: Array<LatLngLiteral> = [
  { lat: 0,  lng: 10 },
 { lat: 0,  lng: 20 },
 { lat: 10, lng: 20 },
  { lat: 10, lng: 10 },
 { lat: 0,  lng: 10 }
 ];

 nestedPaths: Array<Array<LatLngLiteral>> = [[
  { lat: 0,  lng: 10 },
 { lat: 0,  lng: 20 },
  { lat: 10, lng: 20 },
 { lat: 10, lng: 10 },
   { lat: 0,  lng: 10 }
 ], [
  { lat: 0, lng: 15 },
  { lat: 0, lng: 20 },
 { lat: 5, lng: 20 },
  { lat: 5, lng: 15 },
  { lat: 0, lng: 15 }
 ]]
}

import { Component, OnInit } from '@angular/core';
import {TogglemenuService} from '../../services/togglemenu.service';

@Component({
  selector: 'map-hp',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private toggle:TogglemenuService) { }

  ngOnInit() {
  }
onActive=()=>{
this.toggle.active.next(true);
}
}

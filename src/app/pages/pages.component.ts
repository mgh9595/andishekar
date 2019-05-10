import { Component, OnInit } from '@angular/core';
import {TogglemenuService} from '../services/togglemenu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private toggle:TogglemenuService) { }
active:boolean=false;
  ngOnInit() {
    this.toggle.active.subscribe(res=>{
      this.active=res;

    })
  }
  toggleMenu=()=>{
    console.log('emdedoded');
    this.toggle.active.next(false);
  }

}

import { Component, OnInit } from '@angular/core';
import {TogglemenuService} from '../../services/togglemenu.service';

@Component({
  selector: 'bottommenu',
  templateUrl: './bottommenu.component.html',
  styleUrls: ['./bottommenu.component.css']
})
export class BottommenuComponent implements OnInit {
  active_bottom_slide:boolean=false;
  Type:string='';
  slideText='';
  destinations=[" صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  ",];
  constructor() { }

  ngOnInit() {
  }
toggle_slide_bottom=(type:string)=>{
      switch (type) {
      case 'source' :this.slideText='مبدا حرکت';
      break;
      case 'destination' :this.slideText= 'مقصد سفر';
        break;
      case 'time' :this.slideText='زمان حرکت';
    }
    if(type==this.Type){
      this.active_bottom_slide=false;
      this.Type=null;

    }
    else{
      this.Type=type;
      this.active_bottom_slide=true;
    }

};
  remove_destinations=(index:number)=>{
    this.destinations.splice(index,1)
  }
}

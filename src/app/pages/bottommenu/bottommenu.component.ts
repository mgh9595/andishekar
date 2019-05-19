import {Component, ElementRef, OnInit} from '@angular/core';
import * as $ from 'jquery';
const a = mobiscroll.$;
// import * as mobiscroll from 'mobiscroll';
// declare function mobiscroll();
// interface JQuery {
//   <mobiscroll>(options?: any): any;
// }
@Component({
  selector: 'bottommenu',
  templateUrl: './bottommenu.component.html',
  styleUrls: ['./bottommenu.component.css']
})
export class BottommenuComponent implements OnInit {

  active_bottom_slide:boolean=false;
  Type:string='';
  slideText='';
  source='';
Date_type=false;
  noneDestination={desError:"در حال حاضر مقصدی انتخاب نشده است!",sourceError:"در حال حاضر مبداء انتخاب نشده!"};
  destinations=[" صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  "," صههطه نصط،صطاا ص،طخکخص  ",];
  constructor() { }

  ngOnInit() {
    if(this.Type=='time'){
      console.log('wwww');
    }
  }
toggle_slide_bottom=(type:string)=>{
      switch (type) {
      case 'source' :this.slideText='مبدا حرکت';
      break;
      case 'destination' :this.slideText= 'مقصد سفر';
        break;
      case 'time' :{this.slideText='زمان حرکت'}
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

   datetimeDateInit(type?:boolean) {
    if(type){
      console.log(type);
      if(type==true){
        this.Date_type=true;
        setTimeout(()=>{
          var instance = mobiscroll.time('#datetimeTime-demo', {
            theme: 'ios',          // Specify theme like: theme: 'ios' or omit setting to use default
            lang:'fa',    // Specify language like: lang: 'pl' or omit setting to use default
            display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
            mode: $('#mode').val(),        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-mode
            layout:'liquid',
            rtl:true,
            height:50,
            rows:3,
            cssClass:'mgh_slide_menu',
          });
        },200);
      }
      else{
        this.Date_type=false;
        setTimeout(()=>{
          var instance = mobiscroll.time('#datetimeTime-demo', {
            theme: 'ios',          // Specify theme like: theme: 'ios' or omit setting to use default
            lang:'fa',    // Specify language like: lang: 'pl' or omit setting to use default
            display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
            mode: $('#mode').val(),        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-mode
            layout:'liquid',
            height:50,
            rows:3,
            rtl:true,
            cssClass:'mgh_slide_menu',
          });
        },200);
      }

    }
    else{
      this.Date_type=false;
      setTimeout(()=>{
        let instance = mobiscroll.date('#datetimeDate-demo', {
          theme: 'ios',          // Specify theme like: theme: 'ios' or omit setting to use default
          lang:'fa',    // Specify language like: lang: 'pl' or omit setting to use default
          display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
          max: new Date(2050, 7, 14),
          layout:'liquid',
          rtl:true,
          height:50,
          rows:3,
          cssClass:'mgh_slide_menu',
          // width:[100,130,80],
          mode: a('#mode').val()         // More info about mode: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-mode
        });
      },200);
    }



    // document
    //   .getElementById('datetimeDate-show')
    //   .addEventListener('click', function () {
    //     instance.show();
    //   }, false);
    //
    // document
    //   .getElementById('datetimeDate -clear')
    //   .addEventListener('click', function () {
    //     instance.clear();
    //   }, false);

  }



}

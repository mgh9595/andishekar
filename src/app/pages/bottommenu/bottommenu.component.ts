import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ToggledesService} from '../../services/toggledes.service';
import {AuthService} from '../../services/auth.service';
import * as moment from 'jalali-moment';
const a = mobiscroll.$;

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
  tarh_vlaue:number=0;
Date_type=false;
Date:{time:any,date:string};
  EDIT_TYPE:boolean=false;
  noneDestination={desError:"در حال حاضر مقصدی انتخاب نشده است!",sourceError:"در حال حاضر مبداء انتخاب نشده!"};
  destinations=[];
  constructor(private toggle:ToggledesService,private auth:AuthService) {
    this.toggle.coordinate_marker_source_txt.subscribe(res=>{
      res&&res!==''?this.source=res:null;
      console.log(this.source)
    });
    this.toggle.coordinate_marker_end_txt.subscribe(res2=>{
      res2?this.destinations=[...res2]:null;
      console.log(this.destinations)
    });
    this.toggle.EDIT_TYPE.subscribe(res5=>{
      this.EDIT_TYPE=res5;
    })
  }

  ngOnInit() {
    if(this.Type=='time'){
      console.log('wwww');
    }
  }
toggle_slide_bottom=(type:string)=>{
      switch (type) {
      case 'source' :{
        this.slideText='مبدا حرکت';
        this.toggle.isSource.next(true);
      }
      break;
      case 'destination' :{this.slideText= 'مقصد سفر';this.toggle.isSource.next(false)}
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
    const old_value=[...this.toggle.coordinate_marker_end_loc.getValue()];
    old_value.splice(index,1);
    const old_value_text=[...this.destinations];
    console.log(this.destinations);
    old_value_text.splice(index,1);
    this.toggle.coordinate_marker_end_loc.next(old_value);
    this.toggle.coordinate_marker_end_txt.next(old_value_text);

  };
getTime=()=>{
let datetimeTime=a('#datetimeTime-demo').val();
let datetimeDate=  a('#datetimeDate-demo').val();
if(!datetimeTime){
  datetimeTime=moment(Date.now()).format('HH:mm');
}
if(!datetimeDate){
  datetimeDate=moment(Date.now()).locale('fa').format('YYYY/MM/DD');
}
this.Date={time:datetimeTime,date:datetimeDate,};
console.log(this.Date);
};
print_Value=(data)=>{
this.tarh_vlaue=+data.value;
};
   datetimeDateInit(type?:boolean) {
     if (type) {
       console.log(type);
       if (type == true) {
         this.Date_type = true;
         setTimeout(() => {
           var instance = mobiscroll.time('#datetimeTime-demo', {
             theme: 'ios',          // Specify theme like: theme: 'ios' or omit setting to use default
             lang: 'fa',    // Specify language like: lang: 'pl' or omit setting to use default
             display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
             mode: $('#mode').val(),        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-mode
             layout: 'liquid',
             rtl: true,
             height: 38,
             rows: 3,
             cssClass: 'mgh_slide_menu',
           });
         }, 200);
       } else {
         this.Date_type = false;
         setTimeout(() => {
           var instance = mobiscroll.time('#datetimeTime-demo', {
             theme: 'ios',          // Specify theme like: theme: 'ios' or omit setting to use default
             lang: 'fa',    // Specify language like: lang: 'pl' or omit setting to use default
             display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
             mode: $('#mode').val(),        // More info about mode: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-mode
             layout: 'liquid',
             height: 38,
             rows: 3,
             rtl: true,
             cssClass: 'mgh_slide_menu',
           });
         }, 200);
       }

     } else {
       this.Date_type = false;
       setTimeout(() => {
         let instance = mobiscroll.date('#datetimeDate-demo', {
           theme: 'ios',          // Specify theme like: theme: 'ios' or omit setting to use default
           lang: 'fa',    // Specify language like: lang: 'pl' or omit setting to use default
           display: 'inline',  // Specify display mode like: display: 'bottom' or omit setting to use default
           max: new Date(2050, 7, 14),
           layout: 'liquid',
           rtl: true,
           height: 38,
           rows: 3,
           cssClass: 'mgh_slide_menu',
           // width:[100,130,80],
           mode: a('#mode').val()         // More info about mode: https://docs.mobiscroll.com/3-0-0_beta4/datetime#!opt-mode
         });
       }, 200);
     }
   }
  registerRequest=()=>{
     if(this.Valid_request()){
       this.getTime();
       const des_loc=[...this.toggle.coordinate_marker_end_loc.getValue()];
       const desc_text=[...this.destinations];
       const new_destinations=[];
       des_loc.forEach((i,index)=>{
         new_destinations.push({
           "Latitude": i.Lat,
           "Longitude": i.Lng,
           "Text": desc_text[index]
         })
       });
       const data ={
         FromLatitude:this.toggle.coordinate_marker_source_loc.getValue()[0].Lat,
         FromLongitude:this.toggle.coordinate_marker_source_loc.getValue()[0].Lng,
         FromText:this.source,
         KindTarh:this.tarh_vlaue,
         Date:this.Date.date,
         FromTime:this.Date.time,
         ToTime:null,
         Description:null,
         Destinations:new_destinations,
         Token:localStorage.getItem('Token'),
       };
       this.toggle.Final_req.next(data);
       this.toggle.Type_final_req.next(true);
       this.toggle.EDIT_TYPE.next(false)

     }


  };
  UpdateRequest=()=>{
    const req_id=+this.toggle.req_Id.getValue();
    if(this.Valid_request()){
      this.getTime();
      const des_loc=[...this.toggle.coordinate_marker_end_loc.getValue()];
      const desc_text=[...this.destinations];
      const new_destinations=[];
      des_loc.forEach((i,index)=>{
        new_destinations.push({
          "Latitude": i.Lat,
          "Longitude": i.Lng,
          "Text": desc_text[index]
        })
      });
      const data ={
        FromLatitude:this.toggle.coordinate_marker_source_loc.getValue()[0].Lat,
        FromLongitude:this.toggle.coordinate_marker_source_loc.getValue()[0].Lng,
        FromText:this.source,
        KindTarh:this.tarh_vlaue,
        Date:this.Date.date,
        FromTime:this.Date.time,
        ToTime:null,
        Description:null,
        Destinations:new_destinations,
        Token:localStorage.getItem('Token'),
        RequestId:req_id
      };
      this.toggle.Final_req.next(data);
      this.toggle.Type_final_req.next(true)
      this.toggle.EDIT_TYPE.next(true)

    }

};
Valid_request=()=>{
  this.getTime();
  let from_lat=null;
  if(this.toggle.coordinate_marker_source_loc.getValue())
  {
    from_lat=this.toggle.coordinate_marker_source_loc.getValue()[0].Lat
  }
  let from_lng=null;
  if(this.toggle.coordinate_marker_source_loc.getValue())
  {
    from_lng=this.toggle.coordinate_marker_source_loc.getValue()[0].Lat
  }
  const FromText=this.source;

  const des_loc=this.toggle.coordinate_marker_end_loc.getValue();
  const desc_text=this.destinations;
     if(from_lat&&from_lng&&FromText&&Date&&from_lat&&(des_loc.length>0)&&(desc_text.length>0)){
       return true
     }
};
cancel_update=()=>{
  this.toggle.EDIT_TYPE.next(false);
}

}

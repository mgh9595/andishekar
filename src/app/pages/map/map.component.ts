import {Component, OnInit} from '@angular/core';
import {TogglemenuService} from '../../services/togglemenu.service';
import {ToggledesService} from '../../services/toggledes.service';
import {AuthService} from '../../services/auth.service';
import {MyplaceModel} from '../../core/models/myplace.model';
@Component({
  selector: 'map-hp',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  protected map: any;
  show_marker:boolean=false;
  showPlace:boolean=false;
  myPlaces:MyplaceModel[];
  zoom=14;
coordinate={Lat:35.71327702542838,Lng:51.41532897949219};
coordinate_marker_end=[];
coordinate_marker_sorce=[];
langg;
isSource:boolean=true;
  constructor(private toggle:TogglemenuService,private toggle_des:ToggledesService,private auth:AuthService) {
    this.toggle_des.coordinate_marker_source_loc.subscribe(res22=>{
      res22?this.coordinate_marker_sorce=[...res22]:null;
      if(this.coordinate_marker_sorce.length>0){
        this.show_marker=true
      }
    });    this.toggle_des.coordinate_marker_end_loc.subscribe(res33=>{
      res33?this.coordinate_marker_end=[...res33]:null;
    });
    this.toggle_des.isSource.subscribe(res44=>{
      this.isSource=res44;
    });
    this.toggle_des.EDIT_TYPE.subscribe(res34=>{
      if(res34){
        this.coordinate.Lng=this.coordinate_marker_sorce[0].Lng;
        this.coordinate.Lat=this.coordinate_marker_sorce[0].Lat;
      }
    })
  // navigator.geolocation.getCurrentPosition( pos => {
  //   this.coordinate.Lng = pos.coords.longitude;
  //   this.coordinate.Lat = pos.coords.latitude;
  // });

  }

  ngOnInit() {
    this.GetMyplaces();
    this.toggle.Excute_get_Adresses.subscribe(res=>{
      this.GetMyplaces();
    })
  }
onActive=()=>{
this.toggle.active.next(true);
};
print=(event)=> {
  if (this.map){
    console.log(this.coordinate_marker_sorce.length);
    this.langg=this.map.getCenter();
    if(this.isSource){
      if(this.coordinate_marker_sorce.length>0){
        const new_value = [...this.toggle_des.coordinate_marker_source_loc.getValue()];
        console.log(this.toggle_des.coordinate_marker_source_loc.getValue());
        this.toggle_des.coordinate_marker_source_loc.next(new_value.splice(0,1));
      }
      let source_loc=[];
      if(this.toggle_des.coordinate_marker_source_loc.getValue()){
        const source_loc= [...this.toggle_des.coordinate_marker_source_loc.getValue()];
      }

      this.toggle_des.coordinate_marker_source_loc.next(source_loc.concat({Lat:this.langg.lat(),Lng:this.langg.lng()}));
      this.getLocationText({
        Latitude:this.langg.lat(),
        Longitude:this.langg.lng()
      }).subscribe(res1=>{
        if(res1.ResultCode==1){
          this.toggle_des.coordinate_marker_source_txt.next(res1.Address)
        }
      });
      this.toggle_des.isSource.next(false);
      this.show_marker=true;
    }
    else{
      let old_value=[];
      if(this.toggle_des.coordinate_marker_end_loc.getValue()){
        old_value= [...this.toggle_des.coordinate_marker_end_loc.getValue()];
      }
      this.toggle_des.coordinate_marker_end_loc.next(old_value.concat({Lat:this.langg.lat(),Lng:this.langg.lng()}));
      this.getLocationText({
        Latitude:this.langg.lat(),
        Longitude:this.langg.lng()
      }).subscribe(res3=>{
        if(res3.ResultCode==1){
          let old_text=[];
          if(this.toggle_des.coordinate_marker_end_txt.getValue()){
            old_text=[...this.toggle_des.coordinate_marker_end_txt.getValue()]
          }
          this.toggle_des.coordinate_marker_end_txt.next(old_text.concat(res3.Address))
        }
      });
      this.show_marker=true;
    }


  }

};
  showPlaces=()=>{
    this.showPlace=true;
    const x =document.getElementsByClassName('place_texts')[0] as HTMLElement;
    setTimeout(()=>{x.style.display='block'},0)
  };
  mapReady(map) {
    this.map = map;
    this.langg=this.map.getCenter();
  }
  getLocationText=(data:{
    Latitude:number,
    Longitude:number
  })=>{

   return this.auth.GetAddress(data)

  }
  onNotShowPlace=()=>{
    this.showPlace=false;
    const x =document.getElementsByClassName('place_texts')[0] as HTMLElement;
    x.style.display=null
  };
  GetMyplaces=()=>{
    const data={Token:localStorage.getItem('Token')};
    this.auth.SelectSavedAddress(data).subscribe(res=>{
      if (res.ResultCode == 1) {
        this.myPlaces=res.Addresses;
      }
      else if (res.ResultCode !== 1) {
      }
      else {
      }
    })
  };
  selectPlace=(index:number)=>{
    const place=this.myPlaces[index];
    this.map.panTo({lat:place.Latitude,lng:place.Longitude});
    this.zoom=16;
    if(this.isSource){
      let source_loc=[];
      this.toggle_des.coordinate_marker_source_loc.next(source_loc.concat({Lat:place.Latitude,Lng:place.Longitude}));
      this.toggle_des.coordinate_marker_source_txt.next(place.AddressGoogle);
      this.toggle_des.isSource.next(false);
      this.show_marker=true;
    }
    else{
      let old_value=[];
      if(this.toggle_des.coordinate_marker_end_loc.getValue()){
        old_value= [...this.toggle_des.coordinate_marker_end_loc.getValue()];
      }
      this.toggle_des.coordinate_marker_end_loc.next(old_value.concat({Lat:place.Latitude,Lng:place.Longitude}));
      let old_text=[];
      if(this.toggle_des.coordinate_marker_end_txt.getValue()){
        old_text=[...this.toggle_des.coordinate_marker_end_txt.getValue()]
      }
      this.toggle_des.coordinate_marker_end_txt.next(old_text.concat(place.AddressGoogle))
      this.show_marker=true;
    }
  }




  onAutocompleteSelected(result) {
  }

  onLocationSelected(location) {
    this.map.panTo({lat:location.latitude,lng:location.longitude});
  }
  activeInput(){
    document.getElementById('active_input').style.borderBottomLeftRadius='unset';
    document.getElementById('active_input').style.borderBottomRightRadius='unset';
  }
    DiactiveInput(){
    document.getElementById('active_input').style.borderBottomLeftRadius=null;
    document.getElementById('active_input').style.borderBottomRightRadius=null;
  }
  GET_MY_LOC(){
    navigator.geolocation.getCurrentPosition( pos => {
      this.map.panTo({lat:pos.coords.latitude,lng:pos.coords.longitude});
    });

  }
}

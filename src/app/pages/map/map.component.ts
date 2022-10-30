import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TogglemenuService} from '../../services/togglemenu.service';
import {ToggledesService} from '../../services/toggledes.service';
import {AuthService} from '../../services/auth.service';
import {MyplaceModel} from '../../core/models/myplace.model';
import {BehaviorSubject, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
declare let L: any;
@Component({
  selector: 'map-hp',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit,AfterViewInit  {
  protected map: any;
  show_marker = false;
  showPlace = false;
  myPlaces: MyplaceModel[];
coordinate:Subject<any> = new Subject<any>();
langg;
isSource = true;
  coordinate_marker_source_old_marker ;
  coordinate_marker_end_old_marker  = [];
  searchBoxForm= new FormControl();
  searchBoxValues = [];
  constructor(private toggle: TogglemenuService, private toggle_des: ToggledesService, private auth: AuthService) {
    this.toggle_des.coordinate_marker_source_loc.subscribe(res22 => {
      if(res22){
        this.coordinate_marker_source_old_marker?this.map.removeLayer( this.coordinate_marker_source_old_marker):null;
        this.coordinate_marker_source_old_marker = L.marker([res22.Lat, res22.Lng]).addTo(this.map);
      }
      // res22 ? this.coordinate_marker_sorce = [...res22] : null;
      // if (this.coordinate_marker_sorce.length > 0) {
      //   this.show_marker = true;
      // }
    });
    this.toggle_des.coordinate_marker_end_loc.subscribe(res33 => {
      if(res33){
        this.coordinate_marker_end_old_marker.length>0?this.coordinate_marker_end_old_marker.forEach(m=>this.map.removeLayer(m)) :null;
        this.coordinate_marker_end_old_marker = res33.map(m=>L.marker([m.Lat, m.Lng]).addTo(this.map)) ;
      }
    });
    this.toggle_des.isSource.subscribe(res44 => {
      this.isSource = res44;
    });
    this.toggle_des.EDIT_TYPE.subscribe(res34 => {
      if (res34) {
        this.coordinate.next({Lat: this.toggle_des.coordinate_marker_source_loc.getValue().Lat, Lng: this.toggle_des.coordinate_marker_source_loc.getValue().Lng})
      }
    });
    this.coordinate.subscribe(v=>this.map.panTo({lat: v.Lat, lng: v.Lng}));
    this.searchBoxForm.valueChanges.pipe(debounceTime(400)).subscribe(v=>{
      if(v&&v!==''){
        let lang = this.map.getCenter();
        this.auth.getAutoCompleteResult(lang.lat,lang.lng,v).subscribe(v=>{
          this.searchBoxValues = v.items || []
        })
      }else this.searchBoxValues = [];
    })
  // navigator.geolocation.getCurrentPosition( pos => {
  //   this.coordinate.Lng = pos.coords.longitude;
  //   this.coordinate.Lat = pos.coords.latitude;
  // });

  }

  ngOnInit() {
    this.GetMyplaces();
    this.toggle.Excute_get_Adresses.subscribe(res => {
      this.GetMyplaces();
    });

  }
  ngAfterViewInit() {
    this.mapReady();
  }

  onActive = () => {
this.toggle.active.next(true);
}
print = () => {
  if (this.map) {
    this.langg = this.map.getCenter();
    if (this.isSource) {
      this.toggle_des.coordinate_marker_source_loc.next({
        Lat: this.langg.lat,
        Lng: this.langg.lng
      });
      // this.getLocationText({
      //   Latitude: this.langg.lat,
      //   Longitude: this.langg.lng
      // }).subscribe(res1 => {
      //   if (res1.ResultCode == 1) {
      //     this.toggle_des.coordinate_marker_source_txt.next(res1.Address);
      //   }
      // });
      this.toggle_des.coordinate_marker_source_txt.next('هوشنگ آباد ثیثی ');
      this.toggle_des.isSource.next(false);
      this.show_marker = true;
      }

    else {
        let old_value = [];
        if (this.toggle_des.coordinate_marker_end_loc.getValue()) {
          old_value = [...this.toggle_des.coordinate_marker_end_loc.getValue()];
        }
        this.toggle_des.coordinate_marker_end_loc.next(old_value.concat({Lat: this.langg.lat, Lng: this.langg.lng}));
        // this.getLocationText({
        //   Latitude: this.langg.lat,
        //   Longitude: this.langg.lng
        // }).subscribe(res3 => {
        //   if (res3.ResultCode == 1) {
        //     let old_text = [];
        //     if (this.toggle_des.coordinate_marker_end_txt.getValue()) {
        //       old_text = [...this.toggle_des.coordinate_marker_end_txt.getValue()];
        //     }
        //     this.toggle_des.coordinate_marker_end_txt.next(old_text.concat(res3.Address));
        //   }
        // });
      let old_text = [];
      if (this.toggle_des.coordinate_marker_end_txt.getValue()) {
        old_text = [...this.toggle_des.coordinate_marker_end_txt.getValue()];
      }
      this.toggle_des.coordinate_marker_end_txt.next(old_text.concat(' خبثبهبا ثبعاثباعثبثبذثب ثبهثبها'));
        this.show_marker = true;
      }


  }
}
  showPlaces = () => {
    this.showPlace = true;
    const x = document.getElementsByClassName('place_texts')[0] as HTMLElement;
    setTimeout(() => {x.style.display = 'block'; }, 0);
  }
  mapReady() {
     this.map = new L.Map('map', {
      key: 'web.7ce90a91cc6e4c5fa5a9bd7131eb4732',
      maptype: 'dreamy',
      poi: false,
      traffic: false,
       zoomControl:false,
      center: [35.71327702542838, 51.41532897949219],
      zoom: 16
    });
  }
  getLocationText = (data: {
    Latitude: number,
    Longitude: number
  }) => {

   return this.auth.GetAddress(data);

  }
  onNotShowPlace = () => {
    this.showPlace = false;
    const x = document.getElementsByClassName('place_texts')[0] as HTMLElement;
    x.style.display = null;
  }
  GetMyplaces = () => {
    const data = {Token: localStorage.getItem('Token')};
    this.auth.SelectSavedAddress(data).subscribe(res => {
      if (res.ResultCode == 1) {
        this.myPlaces = res.Addresses;
      } else if (res.ResultCode !== 1) {
      } else {
      }
    });
  }
  selectPlace = (index: number) => {
    const place = this.myPlaces[index];
    this.coordinate.next({Lat: place.Latitude, Lng: place.Longitude})

    if (this.isSource) {
      this.toggle_des.coordinate_marker_source_loc.next({Lat: place.Latitude, Lng: place.Longitude});
      this.toggle_des.coordinate_marker_source_txt.next(place.AddressGoogle);
      this.toggle_des.isSource.next(false);
      this.show_marker = true;
    } else {
      let old_value = [];
      if (this.toggle_des.coordinate_marker_end_loc.getValue()) {
        old_value = [...this.toggle_des.coordinate_marker_end_loc.getValue()];
      }
      this.toggle_des.coordinate_marker_end_loc.next(old_value.concat({Lat: place.Latitude, Lng: place.Longitude}));
      let old_text = [];
      if (this.toggle_des.coordinate_marker_end_txt.getValue()) {
        old_text = [...this.toggle_des.coordinate_marker_end_txt.getValue()];
      }
      this.toggle_des.coordinate_marker_end_txt.next(old_text.concat(place.AddressGoogle));
      this.show_marker = true;
    }
  }

removePlace = (index) => {
  const data = {
    Token: localStorage.getItem('Token'),
    AddressAn: this.myPlaces[index].AddressAN
  };
  this.auth.DeleteSavedAddress(data).subscribe(res => {
  if (res.ResultCode == 1) {
    this.myPlaces.splice(index, 1);
  } else if (res.ResultCode !== 1) {
  } else {
  }
});
}



  onAutocompleteSelected(result) {
  }

  onLocationSelected(location) {
    this.map.panTo({lat: location.y, lng: location.x});
  }

  activeInput() {
    document.getElementById('active_input').style.borderBottomLeftRadius = 'unset';
    document.getElementById('active_input').style.borderBottomRightRadius = 'unset';

  }
    DiactiveInput() {
    document.getElementById('active_input').style.borderBottomLeftRadius = null;
    document.getElementById('active_input').style.borderBottomRightRadius = null;
    this.searchBoxValues = [];
  }
  GET_MY_LOC() {
    console.log(navigator.geolocation.getCurrentPosition)
    navigator.geolocation.getCurrentPosition( pos => {
      console.log(pos)
      this.map.panTo({lat: pos.coords.latitude, lng: pos.coords.longitude});
    });

  }
}

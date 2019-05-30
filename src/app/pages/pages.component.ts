import {Component, Inject, OnInit} from '@angular/core';
import {TogglemenuService} from '../services/togglemenu.service';
import {AuthService} from '../services/auth.service';
import {ToggledesService} from '../services/toggledes.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  descrption:string;
  ype_final_req:boolean=false;
  EDIT_TYPE:boolean=false;
  active:boolean=false;
  isWork:boolean=false;
  data:{FromLatitude:any,
    FromLongitude:any,
    FromText:string,
    KindTarh:number,
    Date:any,
    FromTime:any,
    ToTime:any,
    Description:any,
    Destinations:any,
    Token:string,
    RequestId?:number
  };
  errors=[];
  constructor(private Des_service:ToggledesService,public dialog: MatDialog,private toggle:TogglemenuService,private auth :AuthService) {

  }


  ngOnInit() {
    this.toggle.active.subscribe(res=>{
      console.log(this.active)
      this.active=res;
      console.log(this.active)
      res?setTimeout(()=>{this.isWork=true},500):null;

    });
    this.Des_service.Type_final_req.subscribe(res=>{
      this.ype_final_req=res;
      console.log(this.ype_final_req);
      res?this.data=this.Des_service.Final_req.getValue():null;
    }) ;
    this.Des_service.EDIT_TYPE.subscribe(res=>{
      this.EDIT_TYPE=res;
    })
    this.toggle.isWork.subscribe(res=>{
      this.isWork=res
    })
  }



  onClickedOutside() {
    this.toggle.active.next(false);
    this.isWork=false;
  }
  registerRequest=()=> {
    this.errors=[];
    let real_data={...this.data};
    const date=real_data.Date.toString();
    const new_date=date.replace(/\//g,'');
    real_data.Date=new_date;
    real_data.Description=this.descrption;
    this.auth.RequestCar(real_data).subscribe(
      res => {
        this.errors.push({text:res.ResultText,type:res.ResultCode});
        if (res.ResultCode == 1) {
          this.Des_service.getRequest.next(5);
            setTimeout(()=>{},2000)
        }
        else if (res.ResultCode !== 1) {
          this.errors.push(res.ResultText)
          setTimeout(()=>{},2000)
        }
        else {
          this.errors.push(res.ResultText);
          setTimeout(()=>{},2000)
        }
      }
    )
  };
  updateRequest=()=> {
    this.errors=[]
    let real_data={...this.data};
    const date=real_data.Date.toString();
    const new_date=date.replace(/\//g,'');
    real_data.Date=new_date;
    real_data.Description=this.descrption;
    this.auth.UpdateRequestCar(real_data).subscribe(
      res => {
        this.errors.push({text:res.ResultText,type:res.ResultCode});
        if (res.ResultCode == 1) {
          this.Des_service.getRequest.next(5);
          setTimeout(()=>{},2000)
        }
        else if (res.ResultCode !== 1) {
          this.errors.push(res.ResultText);
          setTimeout(()=>{},2000)
        }
        else {
          this.errors.push(res.ResultText);
          setTimeout(()=>{},2000)
        }
      }
    )
  };

  RETURN=()=>{
    this.Des_service.Type_final_req.next(false);
  };
  openDialog(Id:number,type:string) {
    const dialogRef = this.dialog.open(GetNamePlaceDialog,{
      width:'80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let data;
        if(type=='source'){
          data={
            Latitude: this.data.FromLatitude,
            Longitude:this.data.FromLongitude,
            AddressGoogle: this.data.FromText,
            AddressName:result,
            Token: localStorage.getItem('Token')
          };
        }
        else{
          data={
            Latitude: this.data.Destinations[Id].Latitude,
            Longitude:this.data.Destinations[Id].Longitude,
            AddressGoogle: this.data.Destinations[Id].Text,
            AddressName:result,
            Token: localStorage.getItem('Token')
          }
        }
        this.auth.InsertSavedAddress(data).subscribe(
          res => {
            if (res.ResultCode == 1) {
               this.Show_message(res.ResultText)
              this.toggle.Excute_get_Adresses.next(true);
            }
            else if (res.ResultCode !== 1) {
              this.Show_message(res.ResultText)
            }
            else {
              this.Show_message(res.ResultText)
            }
          }
        )

      }

    });
  }
Show_message=(meessage)=>{
  this.dialog.open(Show_Result,{
    width:'80%',
    data:{value:meessage}
  });
};

closeslider(){
  this.toggle.active.next(false);
  this.isWork=false;
  console.log(this.active)
}
}
@Component({
  selector: 'get_name_place',
  templateUrl: 'get_name_place.html',
})
export class GetNamePlaceDialog {
  title:string;
}
@Component({
  selector: 'Show_Result',
  templateUrl: 'Show_Result.html',
})
export class Show_Result {
  title:string;
  constructor(public dialogRef: MatDialogRef<Show_Result>,
              @Inject(MAT_DIALOG_DATA) public data:any){

  }
}

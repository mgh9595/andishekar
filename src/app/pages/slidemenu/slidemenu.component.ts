import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {RequestsModel} from '../../core/models/requests.model';
import {Driver_detailsModel} from '../../core/models/driver_details.model';
import {ToggledesService} from '../../services/toggledes.service';
import {RequestModel} from '../../core/models/request.model';
import {TogglemenuService} from '../../services/togglemenu.service';

@Component({
  selector: 'slidemenu',
  templateUrl: './slidemenu.component.html',
  styleUrls: ['./slidemenu.component.css']
})
export class SlidemenuComponent implements OnInit {
  repass:FormGroup;
  isSubmited:boolean=false;
  result_code:number=1;
  errors=[];
  isActive:boolean=false;
  isActive_request:boolean=false;
  Requests:RequestsModel;
  driver_details:Driver_detailsModel;
  constructor(private form:FormBuilder,private auth:AuthService,public dialog: MatDialog,private ToggledesService:ToggledesService,private toggle :TogglemenuService ) {
    // this.getRequests();
    this.repass=this.form.group({
      lastPass:[null, [Validators.required]],
      newPass:[null, [Validators.required]],
      renewPass:[null, [Validators.required]],
    })
  }

  ngOnInit() {
    this.repass.valueChanges.subscribe(res=>{
      this.errors=[];
      this.result_code=0;
      this.isSubmited=false;
    })
    this.ToggledesService.getRequest.subscribe(res23=>{
      this.getRequests();
    })
  }

getRequests=()=>{
    const data ={Token:localStorage.getItem('Token')};
  this.auth.SelectMyRequest(data).subscribe(
    res=>{
      if(res.ResultCode==1){
        this.Requests=res;
        console.log(this.Requests)
      }
      else if(res.ResultCode!==1){

      }
      else{

      }
    }
  )
};
deleteRequest=(rId)=>{
  const data ={
    RequestId:rId,
      Token:localStorage.getItem('Token')
  };
  this.auth.DeleteMyRequest(data).subscribe(
    res=>{
      if(res.ResultCode==1){
        this.getRequests();
      }
      else if(res.ResultCode!==1){

      }
      else{

      }
    }
  )
};
  openDialog(rId:number) {
    this.toggle.isWork.next(false);
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      result?this.deleteRequest(rId):null;
      this.toggle.isWork.next(true);
    });
  }

  openDialogDriver(rId:number) {
    this.toggle.isWork.next(false);
    const data ={
      RequestId:rId,
      Token:localStorage.getItem('Token')
    };
    this.auth.SelectProfile_Driver(data).subscribe(res=>{
      if(res.ResultCode==1){
        this.driver_details=res;
        const dialogRef = this.dialog.open(driverdetails,{
          data:this.driver_details
        });
        dialogRef.afterClosed().subscribe(result => {
          result?this.deleteRequest(rId):null;
          this.toggle.isWork.next(true);
        });
      }
      else if(res.ResultCode!==1){

      }
      else{

      }

    });

  }



  changePass=()=>{
    this.errors = [];
    this.result_code=0;
    this.isSubmited = true;
    if(this.repass.valid) {
      const newPass = this.repass.get('newPass').value;
      const renewPass = this.repass.get('renewPass').value;
      if (newPass == renewPass) {
        const data={
          OldPassword:this.repass.get('lastPass').value,
          NewPassword:this.repass.get('newPass').value,
          Token:localStorage.getItem('Token')
        };
        this.auth.ResetPasword(data).subscribe(
          res=>{
            if(res.ResultCode==1){
              this.result_code=res.ResultCode;
              this.errors.push(res.ResultText)
            }
            else if(res.ResultCode!==1){
              this.result_code=res.ResultCode;
              this.errors.push(res.ResultText)
            }
            else{
              this.result_code=-1;
              this.errors.push('متاسفانه ارتباط با سرور قطع می باشد');
            }
          }
        )
      } else {
        this.errors.push('رمزهای عبور وارد شده یکسان نمی باشند!')
      }

    }
    if (this.repass.get('lastPass').hasError('required')) {
      this.errors.push('- لطفا رمز عبور قبلی خود را وارد کنید!');
      console.log(this.errors);
    }
    if (this.repass.get('newPass').hasError('required')) {
      this.errors.push('- لطفا رمز عبور جدید خود را وارد کنید!');
      console.log(this.errors);
    }
    if (this.repass.get('renewPass').hasError('required')) {
      this.errors.push('- لطفا مجددا رمز عبور جدید خود را وارد کنید!');
      console.log(this.errors);
    }


  };
  Updaterequest=(index)=>{
    const old_request:RequestModel={...this.Requests.Requestes[index]};
    this.ToggledesService.coordinate_marker_source_loc.next({Lat:old_request.FromLatitude,Lng:old_request.FromLongitude})
    this.ToggledesService.coordinate_marker_source_txt.next(old_request.FromText);
    let end =[];
    let end_text=[];
    old_request.Destinations.forEach(value=>{
      end.push({Lat:value.Latitude,Lng:value.Longitude});
      end_text.push(value.Text);
    });
    this.ToggledesService.coordinate_marker_end_loc.next(end);
    this.ToggledesService.coordinate_marker_end_txt.next(end_text);
    this.ToggledesService.req_Id.next(old_request.RequestId);
    this.ToggledesService.EDIT_TYPE.next(true);
    this.toggle.active.next(false);

  };



  toggleSlide=(type:string)=>{
    const menu= document.getElementsByClassName('slide_content') as HTMLCollectionOf<HTMLElement>;
    const pass= document.getElementById('change_pass');
    const exit= document.getElementById('exit_slide');
    if(type=='pass'){
      this.isActive_request=false;
      this.isActive=!this.isActive;
      menu[0].style.width=null;
      pass.style.display=null;
      exit.style.display=null;

    }
    if(type=='requests'){
      this.isActive=false;
      this.isActive_request=!this.isActive_request;
      if(this.isActive_request){
        pass.style.display='none';
        exit.style.display='none';
        menu[0].style.width='100%';
      }
      else{
        pass.style.display=null;
        exit.style.display=null;
        menu[0].style.width=null;
      }
    }

  };
  Exit=()=>{
    localStorage.clear();
    location.reload();
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
@Component({
  selector: 'driver-details',
  templateUrl: 'driver-details.html',
})
export class driverdetails {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Driver_detailsModel) {}
}

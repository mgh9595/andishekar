import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'slidemenu',
  templateUrl: './slidemenu.component.html',
  styleUrls: ['./slidemenu.component.css']
})
export class SlidemenuComponent implements OnInit {
  repass:FormGroup;
  isSubmited:boolean=false;
  errors=[];
  isActive:boolean=false;
  constructor(private form:FormBuilder) {
    this.repass=this.form.group({
      lastPass:[null, [Validators.required]],
      newPass:[null, [Validators.required]],
      renewPass:[null, [Validators.required]],
    })
  }

  ngOnInit() {
  }
  changePass=()=>{
    this.errors = [];
    this.isSubmited = true;
    if(this.repass.valid) {
      const newPass = this.repass.get('newPass').value;
      const renewPass = this.repass.get('renewPass').value;
      if (newPass == renewPass) {
        console.log('submit')
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


  }
  toggleSlide=()=>{
this.isActive=!this.isActive;
  }
}

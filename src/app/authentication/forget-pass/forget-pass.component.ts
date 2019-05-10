import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
forgetPass:FormGroup;
isSubmited:boolean=false;
errors=[];
  constructor(private form:FormBuilder) {

    this.forgetPass=this.form.group({
      email:[ null,[Validators.required,Validators.email] ]
    })
  }

  ngOnInit() {
  }
  onForgetPass=()=>{
    this.errors=[];
    this.isSubmited=true;
        if(this.forgetPass.valid){

        }
        else if(this.forgetPass.get('email').hasError('required')){
          this.errors.push('لطفا ایمیل را وارد کنید!');
          console.log(this.errors);
        }
        else if(this.forgetPass.get('email').hasError('email')){
          this.errors.push('فرمت ایمیل وارد شده صحیح نیست!');
          console.log(this.errors);

        }
  }
}

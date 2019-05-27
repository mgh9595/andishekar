import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
forgetPass:FormGroup;
isSubmited:boolean=false;
result_code=0;
errors=[];
  constructor(private form:FormBuilder,private auth:AuthService) {

    this.forgetPass=this.form.group({
      email:[ null,[Validators.required,Validators.email] ]
    })
  }

  ngOnInit() {
    this.forgetPass.valueChanges.subscribe(res=>{
      this.errors=[];
      this.result_code=0;
      this.isSubmited=false;
    })
  }
  onForgetPass=()=>{
    this.errors=[];
    this.isSubmited=true;
    this.result_code=0;
        if(this.forgetPass.valid){
          this.auth.Forget(this.forgetPass.value).subscribe(
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
                this.errors.push('متاسفانه ارتباط با سرور قطع می باشد');
              }
            }
          )
        }
        else if(this.forgetPass.get('email').hasError('required')){
          this.errors.push('- لطفا ایمیل را وارد کنید!');
          console.log(this.errors);
        }
        else if(this.forgetPass.get('email').hasError('email')){
          this.errors.push('- فرمت ایمیل وارد شده صحیح نیست!');
          console.log(this.errors);

        }
  }
}

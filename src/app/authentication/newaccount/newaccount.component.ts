import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {

  newaccount: FormGroup;
  isSubmited: boolean = false;
  errors = [];

  constructor(private form: FormBuilder,private auth:AuthService) {
    this.newaccount = this.form.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: [null],
      family: [null],
      mobilenumber: [null]
    })
  }

  ngOnInit() {
  }
  onNewaccount = () => {
    this.errors = [];
    this.isSubmited = true;
    if (this.newaccount.valid) {
      const data ={
        Email:this.newaccount.get('email').value,
        Password:this.newaccount.get('password').value,
        Device:'Web',
        FirstName:this.newaccount.get('name').value?this.newaccount.get('name').value:null,
        LastName:this.newaccount.get('family').value?this.newaccount.get('family').value:null,
        Mobile:this.newaccount.get('mobilenumber').value?this.newaccount.get('mobilenumber').value:null
      };
      this.auth.Register(data

      ).subscribe(
        res=>{
          if(res.ResultCode==1){
            localStorage.setItem('Token',res.ServerToken);
            location.reload();
          }
          else if(res.ResultCode!==1){
            this.errors.push(res.ResultText)
          }
          else{
            this.errors.push('متاسفانه ارتباط با سرور قطع می باشد');
          }
        }
      )
    }
    if (this.newaccount.get('email').hasError('required')) {
      this.errors.push('- لطفا ایمیل را وارد کنید!');
      console.log(this.errors);
    }  if (this.newaccount.get('email').hasError('email')) {
      this.errors.push('- فرمت ایمیل وارد شده صحیح نیست!');
      console.log(this.errors);
    }
    if (this.newaccount.get('password').hasError('required')) {
      this.errors.push('- لطفا رمز عبور خود را وارد کنید!');
      console.log(this.errors);
    }
    if (this.newaccount.get('name').hasError('required')) {
      this.errors.push('- لطفا نام خود را وارد کنید!');
      console.log(this.errors);
    }
    if (this.newaccount.get('family').hasError('required')) {
      this.errors.push('- لطفا نام خانوادگی خود را وارد کنید!');
      console.log(this.errors);
    }
    if (this.newaccount.get('mobilenumber').hasError('required')) {
      this.errors.push('- لطفا تلفن همراه خود را وارد کنید!');
      console.log(this.errors);
    }
  }

}

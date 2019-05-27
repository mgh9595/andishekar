import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  isSubmited: boolean = false;
  errors = [];

  constructor(private form: FormBuilder,private auth:AuthService,private route:Router) {
    this.login = this.form.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }

  onLogin = () => {
    this.errors = [];
    this.isSubmited = true;
    if (this.login.valid) {
      this.auth.Login(this.login.value).subscribe(
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

    } if (this.login.get('email').hasError('required')) {
      this.errors.push('- لطفا ایمیل را وارد کنید!');
      console.log(this.errors);
    }  if (this.login.get('email').hasError('email')) {
      this.errors.push('- فرمت ایمیل وارد شده صحیح نیست!');
      console.log(this.errors);
    }
      if (this.login.get('password').hasError('required')) {
        this.errors.push('- لطفا رمز عبور خود را وارد کنید!');
        console.log(this.errors);
    }
  }
}

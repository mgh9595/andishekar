import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  isSubmited: boolean = false;
  errors = [];

  constructor(private form: FormBuilder) {
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

    } if (this.login.get('email').hasError('required')) {
      this.errors.push('لطفا ایمیل را وارد کنید!');
      console.log(this.errors);
    }  if (this.login.get('email').hasError('email')) {
      this.errors.push('فرمت ایمیل وارد شده صحیح نیست!');
      console.log(this.errors);
    }
      if (this.login.get('password').hasError('required')) {
        this.errors.push('لطفا رمز عبور خود را وارد کنید!');
        console.log(this.errors);
    }
  }
}

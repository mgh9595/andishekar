import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {

  newaccount: FormGroup;
  isSubmited: boolean = false;
  errors = [];

  constructor(private form: FormBuilder) {
    this.newaccount = this.form.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      family: [null, [Validators.required]],
      mobilenumber: [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }
  onNewaccount = () => {
    this.errors = [];
    this.isSubmited = true;
    if (this.newaccount.valid) {

    } if (this.newaccount.get('email').hasError('required')) {
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

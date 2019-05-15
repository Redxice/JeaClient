import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  template: `
<form [formGroup]="form">
    <fieldset>
        <legend>Login</legend>
        <div class="form-field">
            <label>username:</label>
            <input name="username" formControlName="username">
        </div>
        <div class="form-field">
            <label>Password:</label>
            <input name="password" formControlName="password" 
                   type="password">
        </div>
    </fieldset>
    <div class="form-buttons">
        <button class="button button-primary" 
                (click)="Login()">Login</button>
      <button class="button button-primary"
              (click)="Register()">Register</button>
    </div>
</form>`})

export class LoginComponent implements OnInit{
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private router: Router,
              private loginService:LoginService) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  ngOnInit() {
  }
  Login(){
    const val = this.form.value;
    this.loginService.Login(val.username,val.password)
      .subscribe(resp=>{
        const token = resp.headers.get('Auhtorization');
        console.log("token "+token);
        if(token != "" ){
          localStorage.setItem("token",token)
          this.router.navigateByUrl('/');
        }else{
          this.router.navigateByUrl('/2fa')
        }
      })
  }
  Register(){

  }

}

import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  qrForm: FormGroup
  error = false;
  submitted = false;
  twoFactor = false;
  qrCode = "";
  errorCode = false;
  submitted2 = false;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      qrCode: [''],
      code: ['']
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  confirm2fa() {
    this.submitted2 = true;
    this.loginService.SendTwoFactorCode(this.form.code.value, this.form.username.value, this.form.password.value).subscribe(resp => {
      if (resp.body.name) {
        localStorage.setItem("token", resp.headers.get('Authorization'));
        this.router.navigateByUrl('/');
      } else {
        this.errorCode = true;
      }
    })
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService.Login(this.form.username.value, this.form.password.value).subscribe(resp => {
        if (resp.body.name) {
          localStorage.setItem("token", resp.headers.get('Authorization'));
          this.router.navigateByUrl('/');
        } else {
          console.log("qrCode " + resp.body.qrCode);
          this.twoFactor = true;
          this.qrCode = resp.body.qrCode;
        }
      },
      error => {
        console.log("in error");
        this.error = true
      })
  }

  register() {
    this.router.navigateByUrl("/register")
  }

}

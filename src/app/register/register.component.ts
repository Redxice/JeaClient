import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  succes = false;
  error = false;
  submitted= false;
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      enable2factor:['']
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loginService.Register(this.form.username.value,this.form.password.value,
      this.form.email.value,this.form.enable2factor.value).subscribe(resp=>{
        console.log("token "+resp.name);
      this.succes = true;},
      error => this.error = true)
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from "../server.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msg;
  constructor(private fb: FormBuilder,private router: Router,private _myservice:ServerService) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      });
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.value);
    let tmp = {username: this.loginForm.value.name , password: this.loginForm.value.password};
    // this.router.navigate(['/emptyvehicle']);
    this._myservice.logIn(tmp)
    .subscribe(
      data => {
        localStorage.setItem('token',data['token'].toString());
        this.router.navigate(['/emptyvehicle']);
      },
      error => this.msg = error.error.message
    );
  }

}

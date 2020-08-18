import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { AdminserviceService } from "../../adminservice.service";

interface userTypeObj {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  msg;
  allUsers;
  userType: userTypeObj[] = [
    {value: 'Staff' , viewValue: 'Staff'},
    {value: 'Admin' , viewValue: 'admin'},
  ];
  constructor(private fb: FormBuilder,private _myservice:AdminserviceService) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      typeOfUser: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._myservice.showUsers()
    .subscribe(
      data => {
        this.allUsers = data['users'],
        console.log(this.allUsers);
      },
      error => this.msg = error.error.message
    );
  }

  addUser(){
    console.log(this.addUserForm.value);
    let tmp = {username: this.addUserForm.value.name , password: this.addUserForm.value.password , type: this.addUserForm.value.typeOfUser, phone_number: this.addUserForm.value.mobileNumber};
    this._myservice.addUser(tmp)
    .subscribe(
      data => {
        // localStorage.setItem('token',data['token'].toString());
      },
      error => this.msg = error.error.message
    );
  }
}

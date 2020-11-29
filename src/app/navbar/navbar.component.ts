import { Component, OnInit } from '@angular/core';
import { ServerService } from "../server.service";
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin:boolean = false;
  constructor(private _myservice:ServerService,private router: Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._myservice.isAdmin()
    .subscribe(
      data => {
        this.isAdmin = data['isAdmin'];
        console.log(data);
      },
      error => console.log(error.error.message)
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open('Successfully Logged Out', 'Close', {
      duration: 2000,
    });
  }

}

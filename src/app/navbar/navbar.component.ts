import { Component, OnInit } from '@angular/core';
import { ServerService } from "../server.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin:boolean = false;
  constructor(private _myservice:ServerService) { }

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

}

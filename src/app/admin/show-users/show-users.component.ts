import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from "../../adminservice.service";


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  displayedColumns: string[] = ['date', 'name', 'type', 'created_by', 'number'];
  dataSource;
  msg;

  constructor(private _myservice:AdminserviceService) { }

  ngOnInit(): void {
    this._myservice.showUsers()
    .subscribe(
      data => {
        this.dataSource = data['users']
        console.log(this.dataSource);
      },
      error => this.msg = error.error.message
    );
  }

}

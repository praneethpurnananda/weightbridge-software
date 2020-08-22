import { Component, OnInit } from '@angular/core';
import { ServerService } from "../server.service";

@Component({
  selector: 'app-loaded-generate-bill',
  templateUrl: './loaded-generate-bill.component.html',
  styleUrls: ['./loaded-generate-bill.component.css']
})

export class LoadedGenerateBillComponent implements OnInit {
  displayedColumns = ['Billdate', 'Ticketnumber', 'Vehiclenumber', 'Customername' , 'Customrtype' , 'Vehicleweight' , 'Createdby' , 'action'];
  public title = "Loaded vehicle bill generation";

  pendingBills;
  dataSource;
  constructor(private billservice: ServerService) { }

  ngOnInit(): void {
    this.billservice.getPendingBills()
    .subscribe(
      data => this.dataSource = data['allBills'],
      error => console.log(error.error.message)
    );
  }

  demoClick(item){
    console.log(item);
  }

}

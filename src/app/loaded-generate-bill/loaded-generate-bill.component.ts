import { Component, OnInit } from '@angular/core';
import { ServerService } from "../server.service";
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';

@Component({
  selector: 'app-loaded-generate-bill',
  templateUrl: './loaded-generate-bill.component.html',
  styleUrls: ['./loaded-generate-bill.component.css' , '../notloaded-generate-bill/notloaded-generate-bill.component.css']
})

export class LoadedGenerateBillComponent implements OnInit {
  displayedColumns = ['Billdate', 'Ticketnumber', 'Vehiclenumber', 'Customername' , 'Customrtype' , 'Vehicleweight' , 'Createdby' , 'action'];
  public title = "Loaded vehicle bill generation";

  loadedbill: FormGroup;
  pendingBills;
  dataSource;
  filterdata = new MatTableDataSource(this.dataSource);
  fillForm;
  displayForm:boolean = false;
  constructor(private billservice: ServerService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.billservice.getPendingBills()
    .subscribe(
      data => this.dataSource = data['allBills'],
      error => console.log(error.error.message)
    );
  }

  formFunction(item){
    //form
    this.loadedbill = this.fb.group({
      date: [{value: item.current_date , disabled: true} , Validators.required],
      ticketNumber: [{value: item.ticket_number , disabled: true} , Validators.required],
      vehicleNumber: [{value: item.vehicle_number , disabled: true} , Validators.required],
      customerName: [{value: item.customer_name , disabled: true} , Validators.required],
      customerType: [{value: item.customer_type , disabled: true} , Validators.required],
      weight: ['' , Validators.required]
    });
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.filterdata.filter = filterValue.trim().toLowerCase();
  }

  demoClick(item){
    console.log(item);
    this.fillForm = item;
    this.formFunction(item);
    this.displayForm = true;
  }

  submitBill(){
    // let tmp = {
    //         current_date: this.fillForm.current_date,
    //         ticket_number: this.fillForm.ticket_number,
    //         vehicle_number: this.fillForm.vehicle_number,
    //         customer_name: this.fillForm.customer_name,
    //         customer_type: this.fillForm.customer_type,
    //         vehicle_weight: this.loadedbill.value.weight
    //       };
    // console.log(tmp);
    // console.log(this.loadedbill.getRawValue().date);
  }

}

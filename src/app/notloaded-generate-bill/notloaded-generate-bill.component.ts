import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { DatePipe } from "@angular/common";
import { AdminserviceService } from "../adminservice.service";
import { ServerService } from "../server.service";

// interface customerType {
//   value: string;
//   viewValue: string;
// }
@Component({
  selector: 'app-notloaded-generate-bill',
  templateUrl: './notloaded-generate-bill.component.html',
  styleUrls: ['./notloaded-generate-bill.component.css']
})
export class NotloadedGenerateBillComponent implements OnInit {
  public title = "Empty vehicle bill generation";
  emptyvechiclebill: FormGroup;
  ticker = '20';
  currDate;
  allCustomers;
  // let date: Date = new Date();
  // console.log(date);
  constructor(private fb: FormBuilder,public datepipe: DatePipe,private _myservice:AdminserviceService,private billservice: ServerService) {
      this.emptyvechiclebill = this.fb.group({
        date: [{value: this.datepipe.transform(new Date(), 'dd/MM/yyyy') , disabled: true} , Validators.required],
        ticketNumber: [{value: this.demo() , disabled: true} , Validators.required],
        vehicleNumber: ['' , Validators.required],
        customerName: ['' , Validators.required],
        customerType: ['' , Validators.required],
        weight: ['' , Validators.required]
      });
  }


//nt wg  == loade wt - emt wt , tc = (nwt * itecost) *
  ngOnInit(): void {
    let date: Date = new Date();
    this.currDate = this.datepipe.transform(date, 'dd/MM/yyyy');

    this._myservice.displayCustomerType()
    .subscribe(
      data => {this.allCustomers = data['customers']},
      error => console.log(error.error.message)
    );
  }

  demo(){
    return '2';
  }

  submitBill(){
    // console.log(this.emptyvechiclebill.value);
    // let d = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
    let tmp = {
      current_date: new Date(),
      ticket_number: this.demo(),
      vehicle_number: this.emptyvechiclebill.value.vehicleNumber,
      customer_name: this.emptyvechiclebill.value.customerName,
      customer_type: this.emptyvechiclebill.value.customerType,
      vehicle_weight: this.emptyvechiclebill.value.weight
    };
    console.log(tmp);
    this.billservice.pendingBill(tmp)
    .subscribe(
      data => {
            console.log(data),
            this.emptyvechiclebill.reset()
            },
      error => console.log(error.error.message)
    );
  }
  clearDetails(){
    this.emptyvechiclebill.reset();
  }
}

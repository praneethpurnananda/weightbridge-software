import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';


interface customerType {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-notloaded-generate-bill',
  templateUrl: './notloaded-generate-bill.component.html',
  styleUrls: ['./notloaded-generate-bill.component.css']
})
export class NotloadedGenerateBillComponent implements OnInit {
  public title = "Empty vehicle bill generation";
  emptyvechiclebill: FormGroup;
  customerTypeValues: customerType[] = [
    {value: 'type-1' , viewValue: 'type-1'},
    {value: 'type-2' , viewValue: 'type-2'},
    {value: 'type-3' , viewValue: 'type-3'}
  ];
  constructor(private fb: FormBuilder) {
      this.emptyvechiclebill = this.fb.group({
        date: ['' , Validators.required],
        ticketNumber: ['' , Validators.required],
        vehicleNumber: ['' , Validators.required],
        customerName: ['' , Validators.required],
        customerType: ['' , Validators.required],
        weight: ['' , Validators.required]
      });
  }

  ngOnInit(): void {
  }

  submitBill(){
    console.log(this.emptyvechiclebill.value);
  }
  clearDetails(){
    this.emptyvechiclebill.reset();
  }
}

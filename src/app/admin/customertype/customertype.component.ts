import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { AdminserviceService } from "../../adminservice.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

interface itemTypeobj {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-customertype',
  templateUrl: './customertype.component.html',
  styleUrls: ['./customertype.component.css' , '../items/items.component.css']
})
export class CustomertypeComponent implements OnInit {
  customerTypeForm: FormGroup;
  item:  itemTypeobj[] = [
    {value: 'sloid' , viewValue: 'solid'},
    {value: 'sand' , viewValue: 'sand'},
  ];
  constructor(private fb: FormBuilder,private _myservice:AdminserviceService,public dialog: MatDialog) {
    this.customerTypeForm = this.fb.group({
      customertype: ['', Validators.required],
      itemname: ['', Validators.required],
      discount: ['' , Validators.required]
    });
  }

  ngOnInit(): void {
  }

  addCustomerType(){
    console.log(this.customerTypeForm.value);
  }

}

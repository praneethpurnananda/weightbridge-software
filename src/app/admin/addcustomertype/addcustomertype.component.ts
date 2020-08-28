import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { AdminserviceService } from "../../adminservice.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-addcustomertype',
  templateUrl: './addcustomertype.component.html',
  styleUrls: ['./addcustomertype.component.css' , '../items/items.component.css']
})
export class AddcustomertypeComponent implements OnInit {
  addCustomerTypeForm: FormGroup;
  allCustomers;
  constructor(private fb: FormBuilder,private _myservice:AdminserviceService,public dialog: MatDialog) {
    this.addCustomerTypeForm = this.fb.group({
      typename: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._myservice.displayCustomerType()
    .subscribe(
      data => {this.allCustomers = data['customers']},
      error => console.log(error.error.message)
    );
  }

  addType(){
    console.log(this.addCustomerTypeForm.value);
    let tmp = {name: this.addCustomerTypeForm.value.typename};
    this._myservice.addCustomerType(tmp)
    .subscribe(
      data => {
            console.log(data),
            this.addCustomerTypeForm.reset(),
            this.ngOnInit()
          },
      error => console.log(error.error.message)
    );
  }

  deleteItem(item){
    console.log(item._id);
    this._myservice.deleteCustomerType(item._id)
    .subscribe(
      data => {
          console.log(data),
          this.ngOnInit()
          },
      error => console.log(error.error.message)
    );

  }

  edit(item){
    const dialogRef = this.dialog.open(EditCustomer, {
      width:'900px',
      data: {name: item.name , id: item._id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result === 1){
      this.ngOnInit();
      console.log('called');
    }
    });
  }
}


//model box typescript file starts

@Component({
  selector: 'editcustomer',
  templateUrl: 'editcustomer.html',
  styleUrls: ['../items/items.component.css']
})
export class EditCustomer {

  constructor(
    public dialogRef: MatDialogRef<EditCustomer>,
    @Inject(MAT_DIALOG_DATA) public data,private fb: FormBuilder,private _myservice:AdminserviceService) {
      console.log(data);
    }
    onNoClick(): void {
    this.dialogRef.close();
  }



  edit(name,data){
    let tmp = {newName: name, id: data.id};
    console.log(tmp);
    this._myservice.editCustomerType(tmp)
    .subscribe(
      data => console.log(data),
      error => console.log(error.error.message)
    );
  }
}

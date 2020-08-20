import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { AdminserviceService } from "../../adminservice.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-customertype',
  templateUrl: './customertype.component.html',
  styleUrls: ['./customertype.component.css' , '../items/items.component.css']
})
export class CustomertypeComponent implements OnInit {
  customerTypeForm: FormGroup;
  allItems;
  allCustomerTypes;
  allDiscounts;
  constructor(private fb: FormBuilder,private _myservice:AdminserviceService,public dialog: MatDialog) {
    this.customerTypeForm = this.fb.group({
      customertype: ['', Validators.required],
      itemname: ['', Validators.required],
      discount: ['' , Validators.required]
    });
  }

  ngOnInit(): void {
    this._myservice.showItems()
    .subscribe(
      data => this.allItems = data['items'],
      error => console.log(error.error.message)
    );

    this._myservice.displayCustomerType()
    .subscribe(
      data => {this.allCustomerTypes = data['customers']},
      error => console.log(error.error.message)
    );

    this._myservice.displayDiscount()
    .subscribe(
      data => {this.allDiscounts = data['discounts']},
      error => console.log(error.error.message)
    );
  }

  addCustomerType(){
    console.log(this.customerTypeForm.value);
    let tmp = {name: this.customerTypeForm.value.customertype , type: this.customerTypeForm.value.itemname , discount: this.customerTypeForm.value.discount};
    this._myservice.addDiscount(tmp)
    .subscribe(
      data => {
            console.log(data),
            this.customerTypeForm.reset(),
            this.ngOnInit()
          },
      error => console.log(error.error.message)
    );
  }

  deleteDiscount(item){
    this._myservice.deleteDiscount(item._id)
    .subscribe(
      data => {
          console.log(data),
          this.ngOnInit()
          },
      error => console.log(error.error.message)
    );
  }
  editDiscount(item){
    const dialogRef = this.dialog.open(DeletedDiscount, {
      width:'900px',
      data: {name: item.name ,type: item.item_type ,discount: item.discount ,id: item._id},
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
    selector: 'deletediscount',
    templateUrl: 'deletediscount.html',
    styleUrls: ['../items/items.component.css']
  })
  export class DeletedDiscount implements OnInit{
    allItems;
    allCustomerTypes;
    constructor(
      public dialogRef: MatDialogRef<DeletedDiscount>,
      @Inject(MAT_DIALOG_DATA) public data,private fb: FormBuilder,private _myservice:AdminserviceService) {
        console.log(data);
      }
      onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit(): void {
      this._myservice.showItems()
      .subscribe(
        data => this.allItems = data['items'],
        error => console.log(error.error.message)
      );

      this._myservice.displayCustomerType()
      .subscribe(
        data => {this.allCustomerTypes = data['customers']},
        error => console.log(error.error.message)
      );
    }



    edit(name,type,discount,data){
      let tmp = {newName: name,newType: type,newDiscount: discount ,id: data.id};
      console.log(tmp);
      this._myservice.editDiscount(tmp)
      .subscribe(
        data => console.log(data),
        error => console.log(error.error.message)
      );
    }
  }

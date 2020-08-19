import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { AdminserviceService } from "../../adminservice.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  allItems;
  addItemType: FormGroup;
  constructor(private fb: FormBuilder,private _myservice:AdminserviceService,public dialog: MatDialog) {
    this.addItemType = this.fb.group({
      itemtype: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._myservice.showItems()
    .subscribe(
      data => this.allItems = data['items'],
      error => console.log(error.error.message)
    );
  }

  addItem(){
    console.log(this.addItemType.value);
    let tmp = {name: this.addItemType.value.itemtype , amount: this.addItemType.value.price};
    this._myservice.addItem(tmp)
    .subscribe(
      data => {
            console.log(data),
            this.addItemType.reset(),
            this.ngOnInit()
          },
      error => console.log(error.error.message)
    );
  }

  edit(item){
    const dialogRef = this.dialog.open(EditItems, {
      width:'900px',
      data: {name: item.name , amount: item.amount , id: item._id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteItem(item){
    this._myservice.deleteItem(item._id)
    .subscribe(
      data => {
          console.log(data),
          this.ngOnInit()
          },
      error => console.log(error.error.message)
    );
  }

}


//model box typescript file starts

@Component({
  selector: 'edititems',
  templateUrl: 'edititems.html',
  styleUrls: ['./items.component.css']
})
export class EditItems {

  constructor(
    public dialogRef: MatDialogRef<EditItems>,
    @Inject(MAT_DIALOG_DATA) public data,private fb: FormBuilder,private _myservice:AdminserviceService) {
      console.log(data);
    }
    onNoClick(): void {
    this.dialogRef.close();
  }

  edit(name,amount,data){
    let tmp = {newName: name, newAmount: amount , id: data.id};
    console.log(tmp);
    this._myservice.edit(tmp)
    .subscribe(
      data => console.log(data),
      error => console.log(error.error.message)
    );
  }
}

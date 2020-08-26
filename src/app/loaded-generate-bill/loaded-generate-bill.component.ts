import { Component, OnInit } from '@angular/core';
import { ServerService } from "../server.service";
import { AdminserviceService } from "../adminservice.service";
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
  allItems;
  finalWeight;
  allDiscounts;
  totalBill;
  constructor(private billservice: ServerService,private fb: FormBuilder,private _myservice: AdminserviceService) { }

  ngOnInit(): void {
    this.billservice.getPendingBills()
    .subscribe(
      data => {this.dataSource = data['allBills'],console.log(this.dataSource)},
      error => console.log(error.error.message)
    );


    this._myservice.showItems()
    .subscribe(
      data => this.allItems = data['items'],
      error => console.log(error.error.message)
    );

    this._myservice.displayDiscount()
    .subscribe(
      data => {this.allDiscounts = data['discounts'],console.log(data)},
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
      emptyweight: [{value: item.vehicle_weight , disabled: true} , Validators.required],
      itemname: ['' , Validators.required],
      weight: ['' , Validators.required],
      // netweight:[{value: this.finalWeight , disabled: true} , Validators.required],
      // cost:['' , Validators.required],
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


  generateNetWeight(){
    let oldWeight = this.loadedbill.getRawValue().emptyweight;
    let newWeight = this.loadedbill.value.weight;

    this.finalWeight = newWeight - oldWeight;
    console.log(this.finalWeight);
  }

  generateBill(){
    let loadType = this.loadedbill.value.itemname;
    let customerType = this.loadedbill.getRawValue().customerType;

    let itemAmt = this.allItems.find(x => x.name == loadType).amount;
    let discount;
    if(customerType.toLowerCase() === 'none'){
      discount = 0;
    }
    else{
        if(this.allDiscounts.find(x => x.item_type == loadType) == null || this.allDiscounts.find(x => x.customer == customerType) == null){
          discount = 0;
        }
        else{
        discount = this.allDiscounts.find(x => x.customer == customerType && x.item_type == loadType).discount;
      }
    }

    //logs
    console.log('fina wt'+this.finalWeight);
    console.log('item amt'+itemAmt);
    console.log('disc'+discount);

    this.totalBill = (this.finalWeight * itemAmt);
    this.totalBill -= ((this.totalBill) * (discount/100));
    console.log(this.totalBill);
  }

  submitBill(){
    let tmp = {
            bill_id: this.fillForm.id,
            generated_date: new Date(),
            loaded_weight: this.loadedbill.value.weight,
            net_weight: this.finalWeight,
            item:  this.loadedbill.value.itemname,
            amount: this.totalBill
          };
    console.log(tmp);
    // console.log(this.loadedbill.getRawValue());

    this.billservice.finaBill(tmp)
    .subscribe(
      data => {console.log(data),this.ngOnInit()},
      error => console.log(error.error.message)
    );
  }




}

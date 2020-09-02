import { Component, OnInit , ElementRef , Renderer2 , ViewChild , Inject} from '@angular/core';
import { ServerService } from "../server.service";
import { AdminserviceService } from "../adminservice.service";
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { loadedWeightValidation } from "../validations/weightvalidate";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-loaded-generate-bill',
  templateUrl: './loaded-generate-bill.component.html',
  styleUrls: ['./loaded-generate-bill.component.css' , '../notloaded-generate-bill/notloaded-generate-bill.component.css']
})

export class LoadedGenerateBillComponent implements OnInit {
  displayedColumns = ['Billdate', 'Ticketnumber', 'Vehiclenumber', 'Customername' , 'Phonenumber' ,'Customrtype' , 'Vehicleweight' , 'Createdby' , 'action'];
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

  //web cam
  public showWebcam = false;

  public webcamImage1: WebcamImage = null;
  public webcamImage2: WebcamImage = null;
  private trigger1: Subject<void> = new Subject<void>();
  private trigger2: Subject<void> = new Subject<void>();
  public videoOptions: MediaTrackConstraints = {
  // width: {ideal: 1024},
  // height: {ideal: 576}
  };

  public multipleWebcamsAvailable = false;
  public errors: WebcamInitError[] = [];

  public deviceId: string;
  private nextWebcam1: Subject<boolean|string> = new Subject<boolean|string>();
  private nextWebcam2: Subject<boolean|string> = new Subject<boolean|string>();

  //web cams ends


  constructor(private billservice: ServerService,private fb: FormBuilder,private _myservice: AdminserviceService,private renderer: Renderer2,public dialog: MatDialog) { }

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

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        console.log(this.multipleWebcamsAvailable);
      });

    this.displayForm = false;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public get triggerObservable1(): Observable<void> {
    return this.trigger1.asObservable();
  }

  public get triggerObservable2(): Observable<void> {
    return this.trigger2.asObservable();
  }

  public toggleCam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public showNextWebcam1(directionOrDeviceId: boolean|string): void {
    this.nextWebcam1.next(directionOrDeviceId);
  }

  public showNextWebcam2(directionOrDeviceId: boolean|string): void {
    this.nextWebcam2.next(directionOrDeviceId);
  }

  public get nextWebcamObservable1(): Observable<boolean|string> {
    return this.nextWebcam1.asObservable();
  }

  public get nextWebcamObservable2(): Observable<boolean|string> {
    return this.nextWebcam2.asObservable();
  }

  public triggerSnapshot1(): void{
    this.trigger1.next();
  }

  public triggerSnapshot2(): void{
    this.trigger2.next();
  }

  public handleImage1(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    console.log(webcamImage);
    this.webcamImage1 = webcamImage;
  }

  public handleImage2(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage2 = webcamImage;
  }

  retake1(){
    this.webcamImage1 = null;
  }

  retake2(){
    this.webcamImage2 = null;
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
      weight: ['' , [Validators.required, loadedWeightValidation]],
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

  async generateWeightAndBill(){
    await this.generateNetWeight();
    await this.generateBill();
  }

  submitBill(){
    let tmp = {
            bill_id: this.fillForm.id,
            generated_date: new Date(),
            loaded_weight: this.loadedbill.value.weight,
            net_weight: this.finalWeight,
            item:  this.loadedbill.value.itemname,
            amount: this.totalBill,
            image1: this.webcamImage1,
            image2: this.webcamImage2
          };
    console.log(tmp);
    // console.log(this.loadedbill.getRawValue());

    this.billservice.finaBill(tmp)
    .subscribe(
      data => {
              console.log(data),
              console.log(data['doc']);
              this.openPopUp(data['doc']);
              this.webcamImage1 = null;
              this.webcamImage2 = null;
              this.ngOnInit()
              },
      error => console.log(error.error.message)
    );
  }

  //POPUPFUNCTION
  openPopUp(data){
    const dialogRef = this.dialog.open(PrintBill, {
      width:'900px',
      data: {
          // bill_by: data.created_by,
          // bill_date: data.current_date,
          // customer_name: data.customer_name,
          // customer_type: data.customer_type,
          // ticket_number: data.ticket_number,
          // vehicle_number: data.vehicle_number,
          // vehicle_weight: data.vehicle_weight
          name: 'Successfully Billed'
          },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}


//model box typescript file starts

@Component({
  selector: 'printbill',
  templateUrl: 'printbill.html',
  styleUrls: ['./loaded-generate-bill.component.css']
})
export class PrintBill {

  constructor(
    public dialogRef: MatDialogRef<PrintBill>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
    }
    onNoClick(): void {
    this.dialogRef.close();
  }
  printTitle = 'demo';

}

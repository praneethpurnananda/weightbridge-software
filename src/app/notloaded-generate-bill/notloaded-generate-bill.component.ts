import { Component, OnInit , ElementRef , Renderer2 , ViewChild , Inject} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, NgForm, Validators, FormGroupDirective} from '@angular/forms';
import { DatePipe } from "@angular/common";
import { AdminserviceService } from "../adminservice.service";
import { ServerService } from "../server.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import * as SerialPort from 'serialport';
import { createWorker } from 'tesseract.js';



@Component({
  selector: 'app-notloaded-generate-bill',
  templateUrl: './notloaded-generate-bill.component.html',
  styleUrls: ['./notloaded-generate-bill.component.css']
})
export class NotloadedGenerateBillComponent implements OnInit {
  serialPort: typeof SerialPort;
  public title = "Empty vehicle bill generation";
  emptyvechiclebill: FormGroup;
  ticker = '20';
  currDate;
  allCustomers;
  ocrResult;
  imgUrl;
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
  constructor(private fb: FormBuilder,public datepipe: DatePipe,private _myservice:AdminserviceService,private billservice: ServerService,private renderer: Renderer2,public dialog: MatDialog) {
      this.emptyvechiclebill = this.fb.group({
        date: [{value: this.datepipe.transform(new Date(), 'dd/MM/yyyy') , disabled: true} , Validators.required],
        vehicleNumber: ['' , Validators.required],
        customerName: ['' , Validators.required],
        customerType: ['' , Validators.required],
        phonenumber: ['' , [Validators.required , Validators.pattern('^[0-9]+$') , Validators.minLength(5) , Validators.maxLength(10)]],
        weight: ['' , [Validators.required , Validators.pattern('^[0-9]+$')]]
      });
  }


  ngOnInit(): void {
    let date: Date = new Date();
    this.currDate = this.datepipe.transform(date, 'dd/MM/yyyy');

    this._myservice.displayCustomerType()
    .subscribe(
      data => {this.allCustomers = data['customers']},
      error => console.log(error.error.message)
    );

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
        console.log(this.multipleWebcamsAvailable);
      });
  }

  //recognising img
  async doOCR() {
    const worker = createWorker({
      logger: m => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('../../assets/images/demo.jpg'); //this.webcamImage1.imageAsDataUrl
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
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
    var imageBase64 = this.webcamImage1.imageAsDataUrl;
    var blob = new Blob([imageBase64], {type: 'image/png'});
    var file = new File([blob], 'imageFileName.png');
    console.log(file);
    this.doOCR();
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
  //POPUPFUNCTION
  openPopUp(data){
    const dialogRef = this.dialog.open(PrintEmptyBill, {
      width:'900px',
      data: {
          bill_by: data.created_by,
          bill_date: data.current_date,
          customer_name: data.customer_name,
          customer_type: data.customer_type,
          ticket_number: data.ticket_number,
          vehicle_number: data.vehicle_number,
          vehicle_weight: data.vehicle_weight,
          phone_number: data.phone_number,
          images: data.images,
          },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  submitBill(fData: any,formDirective: FormGroupDirective){
    let tmp = {
      current_date: new Date(),
      vehicle_number: this.emptyvechiclebill.value.vehicleNumber,
      customer_name: this.emptyvechiclebill.value.customerName,
      customer_type: this.emptyvechiclebill.value.customerType,
      vehicle_weight: this.emptyvechiclebill.value.weight,
      phone_number: this.emptyvechiclebill.value.phonenumber,
      image1: this.webcamImage1,
      image2: this.webcamImage2
    };
    console.log(tmp);
    this.billservice.pendingBill(tmp)
    .subscribe(
      data => {
            console.log(data),
            formDirective.resetForm();
            this.emptyvechiclebill.reset();
            this.emptyvechiclebill.reset({
              date:  this.datepipe.transform(new Date(), 'dd/MM/yyyy')
            });
            console.log(data['doc']);
            this.openPopUp(data['doc']);
            this.webcamImage1 = null;
            this.webcamImage2 = null;
            },
      error => console.log(error.error.message)
    );
  }
  clearDetails(){
    this.emptyvechiclebill.reset();
  }
}



//model box typescript file starts

@Component({
  selector: 'printemptybill',
  templateUrl: 'printemptybill.html',
  styleUrls: ['./notloaded-generate-bill.component.css']
})
export class PrintEmptyBill {

  constructor(
    public dialogRef: MatDialogRef<PrintEmptyBill>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
    }
    onNoClick(): void {
    this.dialogRef.close();
  }
  printTitle = 'demo';

}

import { Component, OnInit , ElementRef , Renderer2 , ViewChild } from '@angular/core';
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
  @ViewChild('video1', { static: true }) videoElement1: ElementRef;
  @ViewChild('video2', { static: true }) videoElement2: ElementRef;
  @ViewChild('video3', {static: true}) videoElement3: ElementRef;
  videoWidth = 0;
  videoHeight = 0;
  constraints = {
    video: {
      facingMode: "user",
      width: {ideal : 302},
      height: {ideal: 302}
    }
  };
  public title = "Empty vehicle bill generation";
  emptyvechiclebill: FormGroup;
  ticker = '20';
  currDate;
  allCustomers;
  // let date: Date = new Date();
  // console.log(date);
  constructor(private fb: FormBuilder,public datepipe: DatePipe,private _myservice:AdminserviceService,private billservice: ServerService,private renderer: Renderer2) {
      this.emptyvechiclebill = this.fb.group({
        date: [{value: this.datepipe.transform(new Date(), 'dd/MM/yyyy') , disabled: true} , Validators.required],
        ticketNumber: [{value: this.demo() , disabled: true} , Validators.required],
        vehicleNumber: ['' , Validators.required],
        customerName: ['' , Validators.required],
        customerType: ['' , Validators.required],
        weight: ['' , Validators.required]
      });
  }


  //start camera one method
  startCameraOne(){
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      console.log(navigator.mediaDevices);
      console.log(navigator.mediaDevices.getUserMedia);
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideoOne.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }
  //start camera two method
  startCameraTwo(){
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      console.log(navigator.mediaDevices);
      console.log(navigator.mediaDevices.getUserMedia);
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideoTwo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorrt, camera not available.');
    }
  }
  //start camera three method
  startCameraThree(){
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      console.log(navigator.mediaDevices);
      console.log(navigator.mediaDevices.getUserMedia);
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideoThree.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  //if error during starting of camera
  handleError(error) {
    console.log('Error: ', error);
  }
  attachVideoOne(stream) {
    this.renderer.setProperty(this.videoElement1.nativeElement, 'srcObject', stream);

    this.renderer.listen(this.videoElement1.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement1.nativeElement.videoHeight;
      this.videoWidth = this.videoElement1.nativeElement.videoWidth;
    });
  }
  attachVideoTwo(stream) {
    this.renderer.setProperty(this.videoElement2.nativeElement, 'srcObject', stream);

    this.renderer.listen(this.videoElement2.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement2.nativeElement.videoHeight;
      this.videoWidth = this.videoElement2.nativeElement.videoWidth;
    });
  }
  attachVideoThree(stream) {
    this.renderer.setProperty(this.videoElement3.nativeElement, 'srcObject', stream);

    this.renderer.listen(this.videoElement3.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement3.nativeElement.videoHeight;
      this.videoWidth = this.videoElement3.nativeElement.videoWidth;
    });
  }

//nt wg  == loade wt - emt wt , tc = (nwt * itecost) *
  ngOnInit(): void {
    this.startCameraOne();
    this.startCameraTwo();
    this.startCameraThree();
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

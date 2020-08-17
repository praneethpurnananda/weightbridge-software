import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('vtwo', { static: true }) videoTwoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('cantwo', { static: true }) canvasTwo: ElementRef;
  videoWidth = 0;
  videoHeight = 0;
  constraints = {
   video: {
       facingMode: "user",
       width: { ideal: 4096 },
       height: { ideal: 2160 }
   },
   vtwo: {
     facingMode: "environment",
     width: { ideal: 4096},
     height: { ideal: 2160}
   }
};

constructor(private renderer: Renderer2) {}
//start camera method
startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      console.log(navigator.mediaDevices);
      console.log(navigator.mediaDevices.getUserMedia);
 navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
        alert('Sorry, camera not available.');
    }
}
//if error during starting of camera
handleError(error) {
    console.log('Error: ', error);
}

attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.setProperty(this.videoTwoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
        this.videoHeight = this.videoElement.nativeElement.videoHeight;
        this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
    this.renderer.listen(this.videoTwoElement.nativeElement, 'play', (event) => {
        this.videoHeight = this.videoTwoElement.nativeElement.videoHeight;
        this.videoWidth = this.videoTwoElement.nativeElement.videoWidth;
    });
}

ngOnInit() {
    this.startCamera();
}

//to Capture pic
capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
}
captureTwo(){
    this.renderer.setProperty(this.canvasTwo.nativeElement, 'width' , this.videoWidth);
    this.renderer.setProperty(this.canvasTwo.nativeElement, 'height', this.videoHeight);
    this.canvasTwo.nativeElement.getContext('2d').drawImage(this.videoTwoElement.nativeElement, 0, 0);
}
}

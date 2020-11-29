import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status:boolean = true;
  isConnected = true;
  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        console.log('online');
        this.status = true;
      }
      else {
        console.log('offline');
        this.status = false;
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient , HttpParams , HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  backendService = environment.backendService;
  constructor(private _http: HttpClient) { }

  logIn(body: any){
  return this._http.post(this.backendService+'/users/login', body,{
    observe: 'body'
  });
  }

  pendingBill(body: any){
    return this._http.post(this.backendService+'/bill/emptyBill', body,{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

  getPendingBills(){
    return this._http.get(this.backendService+'/bill/emptyBills',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

}

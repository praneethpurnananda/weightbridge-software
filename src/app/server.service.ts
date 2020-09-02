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

  isAdmin(){
    return this._http.get(this.backendService+'/users/isAdmin',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
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

  finaBill(body: any){
    return this._http.post(this.backendService+'/bill/generateBill', body,{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }


  getAllBills(){
    return this._http.get(this.backendService+'/bill/allGeneratedBills',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient , HttpParams , HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  backendService = environment.backendService;
  constructor(private _http: HttpClient) { }

  addUser(body: any){
  return this._http.post(this.backendService+'/users/register', body,{
    observe: 'body',
    headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
  });
  }

  showUsers(){
  return this._http.get(this.backendService+'/admin/allUsers',{
    observe: 'body',
    headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
  });
  }

}

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

  addItem(body: any){
  return this._http.post(this.backendService+'/admin/addItem', body,{
    observe: 'body',
    headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
  });
  }

  showItems(){
    return this._http.get(this.backendService+'/admin/allItems',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

  deleteItem(tmp){
    return this._http.delete(this.backendService+'/admin/deleteItem',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
      params: new HttpParams().append('id' , tmp)
    });
  }

  edit(body: any){
    return this._http.post(this.backendService+'/admin/editItem', body,{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
    });
  }
}

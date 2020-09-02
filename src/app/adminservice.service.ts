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
  return this._http.get(this.backendService+'/users/allUsers',{
    observe: 'body',
    headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
  });
  }

  deleteUser(tmp){
    return this._http.delete(this.backendService+'/users/deleteUser',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
      params: new HttpParams().append('id' , tmp)
    });
  }


  addItem(body: any){
  return this._http.post(this.backendService+'/item/addItem', body,{
    observe: 'body',
    headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
  });
  }

  showItems(){
    return this._http.get(this.backendService+'/item/allItems',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

  deleteItem(tmp){
    return this._http.delete(this.backendService+'/item/deleteItem',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
      params: new HttpParams().append('id' , tmp)
    });
  }

  edit(body: any){
    return this._http.post(this.backendService+'/item/editItem', body,{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
    });
  }

  addCustomerType(body: any){
  return this._http.post(this.backendService+'/customer/addCustomer', body,{
    observe: 'body',
    headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
  });
  }

  displayCustomerType(){
    return this._http.get(this.backendService+'/customer/allCustomers',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

  deleteCustomerType(tmp){
    return this._http.delete(this.backendService+'/customer/deleteCustomer',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
      params: new HttpParams().append('id' , tmp)
    });
  }

  editCustomerType(body: any){
    return this._http.post(this.backendService+'/customer/editCustomer', body,{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
    });
  }

  addDiscount(body: any){
    return this._http.post(this.backendService+'/discount/addCustomerDiscount', body,{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

  displayDiscount(){
    return this._http.get(this.backendService+'/discount/allCustomerDiscounts',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token'))
    });
  }

  deleteDiscount(tmp){
    return this._http.delete(this.backendService+'/discount/deleteCustomerDiscount',{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
      params: new HttpParams().append('id' , tmp)
    });
  }

  editDiscount(body: any){
    return this._http.post(this.backendService+'/discount/editCustomerDiscount', body,{
      observe: 'body',
      headers: new HttpHeaders().append('token' , localStorage.getItem('token')),
    });
  }
}

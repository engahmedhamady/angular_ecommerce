import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/order';



@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
 
private purchaseUrl:string="http://localhost:8081/purchase/addpurchase";
  constructor(private _httpClient:HttpClient) { }
  placeOrder(purchase:Order):Observable<any>{
   const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this._httpClient.post<Order>(this.purchaseUrl,purchase ,httpOptions);
   
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderResponse } from '../models/order-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(order: { symbol: string; quantity: number }):Observable<OrderResponse>  {
    return this.http.post<OrderResponse>(`${environment.apiUrl}/orders/execute`, order);
  }
 
  validateOrder(order: { symbol: string; quantity: number }) : Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${environment.apiUrl}/orders/validate`, order);
  }

  
}



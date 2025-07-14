import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(order: { symbol: string; quantity: number }) {
    return this.http.post(`${environment.apiUrl}/orders/execute`, order);
  }

  
}



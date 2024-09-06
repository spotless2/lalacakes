import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/Order';
import { OrderDetails } from '../interfaces/OrderDetails';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/orders';
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
  
  saveOrder(orderDetails: OrderDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}/order`, orderDetails);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/status`, { status });
  }
}

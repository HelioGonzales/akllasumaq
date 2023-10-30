import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  apiURLOrders = environment.api

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURLOrders}orders`)
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}orders/${orderId}`)
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiURLOrders}orders`, order)
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}orders/${order.id}`, order)
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}orders/${orderId}`)
  }
}

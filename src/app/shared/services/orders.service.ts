import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.api

  constructor(private http: HttpClient, private stripeSvc: StripeService, private router: Router) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURLOrders}orders`)
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}orders/${orderId}`)
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiURLOrders}orders`, order)
  }

  updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}orders/${orderId}`, orderStatus)
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}orders/${orderId}`)
  }

  getTotalOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiURLOrders}orders/get/count`)
  }

  getTotalSales(): Observable<any> {
    return this.http.get<any>(`${this.apiURLOrders}orders/get/totalsales`)
  }

  createCheckoutSession(orderItem: OrderItem[]) {
    return this.http.post(`${this.apiURLOrders}orders/create-checkout-session`, orderItem)
      .pipe(switchMap((session: { id?: string }) => {
        return this.stripeSvc.redirectToCheckout({ sessionId: session.id! })

      }))
  }

  cacheOrderData(order: Order) {
    localStorage.setItem('orderData', JSON.stringify(order))
  }

  getCacheOrderData(): Order {
    return JSON.parse(localStorage.getItem('orderData') || '{}')
  }

  removeCacheOrderData() {
    localStorage.removeItem('orderData')
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  constructor(private orderSvc: OrdersService, private cartSvc: CartService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const orderId = params['orderId']

      if (orderId) {
        const orderData = this.orderSvc.getCacheOrderData()

        this.orderSvc.createOrder(orderData).subscribe(() => {
          this.cartSvc.empyCart()
          this.orderSvc.removeCacheOrderData()
        })
      }
    })
  }
}

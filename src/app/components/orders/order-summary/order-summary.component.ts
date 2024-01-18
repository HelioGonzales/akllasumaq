import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  endSubs$: Subject<void> = new Subject()
  totalPrice!: number

  constructor(private cartSvc: CartService, private productSvc: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this._getOrderSummary()
  }

  goToCheckout() {
    this.router.navigate(['cart-page/checkout'])
  }

  private _getOrderSummary() {
    this.cartSvc.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart => {
      this.totalPrice = 0
      if (cart) {
        cart.items?.map(item => {
          this.productSvc.getProduct(item.productId!).pipe(take(1)).subscribe((product: any) => {
            this.totalPrice += product.price * item.quantity!
          })
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }

}

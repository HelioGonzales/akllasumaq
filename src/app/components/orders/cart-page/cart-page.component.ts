import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItemDetailed } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = []
  cartCount = 0
  endSubs$: Subject<void> = new Subject()

  constructor(private router: Router, private cartSvc: CartService, private productSvc: ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails()
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    // this.cartSvc.deleteCartItem(cartItem.product?.id!)


    Swal.fire({
      title: 'Delete Product',
      text: `Are you sure you want to delete the product"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartSvc.deleteCartItem(cartItem.product?.id!)

      } else if (result.isDismissed) {
        return
      }
    });
  }

  backToShop() {
    this.router.navigate(['/products'])
  }

  calculateSubTotalPrice(item: any): number {
    return (item.product?.price || 0) * (item.quantity || 0);
  }

  private _getCartDetails() {
    this.cartSvc.cart$.pipe(takeUntil(this.endSubs$)).subscribe(res => {
      this.cartItemsDetailed = []
      this.cartCount = res?.items?.length ?? 0
      res.items?.forEach((cartItem) => {
        this.productSvc.getProduct(cartItem.productId!).subscribe(resProduct => {
          this.cartItemsDetailed.push({
            product: resProduct,
            quantity: cartItem.quantity
          })
        })
      })
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}

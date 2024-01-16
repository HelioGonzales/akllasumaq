import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnDestroy {
  product!: Product
  productid!: string
  quanity = 1
  endSubs$ = new Subject<void>()

  constructor(private activatedRoute: ActivatedRoute, private productsSvc: ProductsService, private cartSvc: CartService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productid = params['productid']

    })

    this._getProduct(this.productid)
  }

  addToCart() { }

  private _getProduct(id: string) {
    this.productsSvc.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(product => {
      this.product = product
    })
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quanity
    }

    this.cartSvc.setCartItems(cartItem)
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }

}

import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  @Input() products: Product[] = []

  constructor(private cartSvc: CartService) { }

  addProductToCart(productId: string) {
    const cartItem: CartItem = {
      productId: productId,
      quantity: 1
    }
    this.cartSvc.setCartItems(cartItem)
  }

}

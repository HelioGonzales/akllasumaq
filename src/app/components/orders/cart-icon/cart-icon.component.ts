import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {

  cartCount = 0

  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
    this.cartSvc.cart$.subscribe(cart => {
      this.cartCount = cart?.items?.length ?? 0
    })
  }

}

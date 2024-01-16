import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  quanity = 1

  constructor(private router: Router) {

  }

  backToShop() {
    this.router.navigate(['/products'])
  }
}

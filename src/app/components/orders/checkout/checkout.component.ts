import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart';
import { Order } from 'src/app/shared/models/order';
import { OrderItem } from 'src/app/shared/models/order-item';
import { User } from 'src/app/shared/models/user';
import { ORDER_STATUS } from 'src/app/shared/order.constants';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UsersService } from 'src/app/shared/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  isSubmitted = false
  orderItems: OrderItem[] = []
  // userId = ''
  form!: FormGroup
  endSubs$ = new Subject<void>()

  constructor(private router: Router, private formBuilder: FormBuilder, private cartSrv: CartService, private orderSvc: OrdersService) {

  }

  ngOnInit(): void {
    this._initForm()
    this._getCartItems()
  }

  placeOrder() {
    this.isSubmitted = true

    if (this.form.invalid) {
      return
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      // country: this.checkoutForm['country'].value,
      country: "",
      zip: this.checkoutForm['zip'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      user: this.checkoutForm['name'].value,
      dateOrdered: `${Date.now()}`
    }

    this.orderSvc.createOrder(order).subscribe(() => {
      // Redirect to thank you page // payment page

      this.cartSrv.empyCart()

      this.router.navigate(['cart-page/thank-you'])


    })

  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['Helio', Validators.required],
      email: ['helio@gmail.com', [Validators.required, Validators.email]],
      // password: ['123456', Validators.required],
      phone: ['9508231', Validators.required],
      street: ['San Antonio A-8', Validators.required],
      apartment: ['4', Validators.required],
      zip: ['11-110', Validators.required],
      city: ['Ica', Validators.required],
    })
  }

  private _getCartItems() {
    const cart: Cart = this.cartSrv.getCart()

    if (cart.items) {
      this.orderItems = cart.items?.map(item => {
        return {
          product: item.productId,
          quantity: Number(item.quantity)
        }
      })
    } else {
      this.orderItems = []
    }

    console.log(this.orderItems);


  }

  get checkoutForm() {
    return this.form.controls
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }

  backToShop() {
    this.router.navigate(['cart-page'])
  }
}

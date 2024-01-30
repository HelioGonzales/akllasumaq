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
  userId = '65aecf73a35929cff523215b'
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
      user: this.userId,
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
      password: ['123456', Validators.required],
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

  // private _checkEditMode() {
  //   this.activatedRoute.params.subscribe((res) => {
  //     if (res['id']) {
  //       this.editMode = true
  //       this.currentUserId = res['id']
  //       this.usersSvc.getUser(res['id']).subscribe(user => {
  //         this.userForm['name'].setValue(user['name']);
  //         this.userForm['email'].setValue(user['email']);
  //         this.userForm['isAdmin'].setValue(user['isAdmin']);
  //         this.userForm['street'].setValue(user['street']);
  //         this.userForm['apartment'].setValue(user['apartment']);
  //         this.userForm['zip'].setValue(user['zip']);
  //         this.userForm['city'].setValue(user['city']);
  //         this.userForm['password'].setValidators([]);
  //         this.userForm['password'].updateValueAndValidity()

  //       })
  //     } else {
  //       this.editMode = false
  //     }

  //   })
  // }

  // private _addUser(user: User) {
  //   this.usersSvc.createUser(user).pipe(takeUntil(this.endSubs$)).subscribe(res => {
  //     Swal.fire({
  //       title: 'Success',
  //       text: 'User created successfully',
  //       icon: 'success',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     }).then(() => {
  //       this.router.navigate(['/admin/users'])
  //     });
  //   },
  //     error => {
  //       Swal.fire({
  //         title: 'Error',
  //         text: 'Failed to create user',
  //         icon: 'error',
  //         showConfirmButton: false,
  //         timer: 3000,
  //       })

  //       this.form.reset()
  //     })
  // }

  // private _updateUser(user: User) {
  //   this.usersSvc.updateUser(user).pipe(takeUntil(this.endSubs$)).subscribe(res => {
  //     Swal.fire({
  //       title: 'Success',
  //       text: 'User updated successfully',
  //       icon: 'success',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     }).then(() => {
  //       this.router.navigate(['/admin/users'])
  //     });
  //   },
  //     error => {
  //       Swal.fire({
  //         title: 'Error',
  //         text: 'Failed to update user',
  //         icon: 'error',
  //         showConfirmButton: false,
  //         timer: 3000,
  //       })

  //       this.form.reset()
  //     })
  // }

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

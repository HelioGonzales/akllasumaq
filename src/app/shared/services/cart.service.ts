import { Injectable } from '@angular/core';
import { CartItem, Cart } from '../models/cart';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';

export const CART_KEY = "cart"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart())
  // cart$: Subject<Cart> = new Subject()

  constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart()

    if (!cart) {
      const initialCart = {
        items: []
      }
      const initialCartJson = JSON.stringify(initialCart)
      localStorage.setItem(CART_KEY, initialCartJson)
    }
  }

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(CART_KEY)!
    const cart: Cart = JSON.parse(cartJsonString)

    return cart
  }

  setCartItems(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart()
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId)

    if (cartItemExist) {
      cart.items?.map(item => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity!
          } else {
            item.quantity = item.quantity! + cartItem.quantity!
          }
        }
      })

      Swal.fire({
        title: 'Success',
        text: 'Product successfully added to cart',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
    } else {
      cart.items?.push(cartItem)
      Swal.fire({
        title: 'Success',
        text: 'Product successfully added to cart',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      })
    }

    const cartJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJson)

    this.cart$.next(cart)

    return cart
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart()
    const newCart = cart.items?.filter(item => item.productId !== productId)

    cart.items = newCart

    const cartJsonString = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJsonString)

    this.cart$.next(cart)
  }
}

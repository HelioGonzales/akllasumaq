import { Injectable } from '@angular/core';
import { CartItem, Cart } from '../models/cart';
import { BehaviorSubject, Subject } from 'rxjs';

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

  setCartItems(cartItem: CartItem): Cart {
    const cart = this.getCart()
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId)

    if (cartItemExist) {
      cart.items?.map(item => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity! + cartItem.quantity!
        }
      })
    } else {
      cart.items?.push(cartItem)
    }

    const cartJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJson)

    this.cart$.next(cart)

    return cart
  }
}

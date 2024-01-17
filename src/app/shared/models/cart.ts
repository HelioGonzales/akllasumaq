import { Product } from "./product"

export interface Cart {
  items?: CartItem[]
}

export interface CartItem {
  productId?: string,
  quantity?: number
}

export interface CartItemDetailed {
  product?: Product,
  quantity?: number
}

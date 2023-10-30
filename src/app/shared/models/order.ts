import { OrderItem } from "./order-item";
import { User } from "./user";

export interface Order {
  id?: string,
  orderItem?: OrderItem,
  shippingAddress1?: string,
  shippingAddress2?: string,
  city?: string,
  zip?: string,
  phone?: string,
  status?: number,
  totalPrice?: string,
  user?: User,
  dateOrdered: Date
}

import { OrderItem } from "./order-item";
import { User } from "./user";

export interface Order {
  _id?: string,
  orderItems?: OrderItem[],
  shippingAddress1?: string,
  shippingAddress2?: string,
  city?: string,
  country?: string,
  zip?: string,
  phone?: string,
  status?: number,
  totalPrice?: string,
  user?: User,
  dateOrdered: Date
}

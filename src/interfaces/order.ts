
import { Product } from "./product";


export interface CartItem {
  count: number;
  product: Product;
  price: number;
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

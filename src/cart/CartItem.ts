import { Product } from 'product/Product';
import { CartItemId } from 'cart/CartItemId';

export type CartItem = {
  id: CartItemId;
  product: Product;
  quantity: number;
};

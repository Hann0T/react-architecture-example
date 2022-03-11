import { Product } from '@domain/entities/Product';
import { CartItemId } from '@domain/valueObjects/CartItemId';

export type CartItem = {
  id: CartItemId;
  product: Product;
  quantity: number;
};

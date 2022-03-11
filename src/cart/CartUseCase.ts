import { Cart } from 'cart/entities/Cart';
import { CartItem } from 'cart/CartItem';
import { CartItemId } from 'cart/CartItemId';
import { DataPersistenceOutputPort } from 'dataPersistence/DataPersistenceOutputPort';

export interface CartUseCase {
  cart: Cart;
  repository: DataPersistenceOutputPort;
  registerRepository(repository: DataPersistenceOutputPort): void;
  saveCartProduct(cartItem: CartItem): void;
  increaseQuantityOfProduct(id: CartItemId): void;
  getCartProducts(): CartItem[];
  deleteProduct(id: CartItemId): void;
}

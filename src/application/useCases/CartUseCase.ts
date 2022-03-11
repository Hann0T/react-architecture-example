import { Cart } from '@domain/entities/Cart';
import { CartItem } from '@domain/valueObjects/CartItem';
import { CartItemId } from '@domain/valueObjects/CartItemId';
import { DataPersistenceOutputPort } from '@application/outputPorts/DataPersistenceOutputPort';

export interface CartUseCase {
  cart: Cart;
  repository: DataPersistenceOutputPort;
  registerRepository(repository: DataPersistenceOutputPort): void;
  saveCartProduct(cartItem: CartItem): void;
  increaseQuantityOfProduct(id: CartItemId): void;
  getCartProducts(): CartItem[];
  deleteProduct(id: CartItemId): void;
}

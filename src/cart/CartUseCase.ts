import { CartItem } from 'cart/CartItem';
import { CartItemId } from 'cart/CartItemId';
import { DataPersistenceOutputPort } from 'dataPersistence/DataPersistenceOutputPort';
import { ProductId } from 'product/ProductId';

export interface CartUseCase {
  repository: DataPersistenceOutputPort;
  registerRepository(repository: DataPersistenceOutputPort): void;
  saveCartProduct(cartItem: CartItem): void;
  increaseQuantityOfProduct(id: CartItemId): void;
  decreaseQuantityOfProduct(id: CartItemId): void;
  getCartProducts(): CartItem[];
  hasProduct(id: ProductId): boolean;
  deleteProduct(id: CartItemId): void;
}

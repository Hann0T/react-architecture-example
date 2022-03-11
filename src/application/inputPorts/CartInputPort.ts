import { Cart } from 'domain/entities/Cart';
import { CartItem } from '@domain/valueObjects/CartItem';
import { CartItemId } from '@domain/valueObjects/CartItemId';
import { CartUseCase } from '@application/useCases/CartUseCase';
import { DataPersistenceOutputPort } from '@application/outputPorts/DataPersistenceOutputPort';

export const CartInputPort: CartUseCase = class {
  static repository: DataPersistenceOutputPort;
  static cart: Cart = new Cart();

  static registerRepository(repository: DataPersistenceOutputPort): void {
    CartInputPort.repository = repository;
  }

  static saveCartProduct(CartItem: CartItem): void {
    CartInputPort.cart.addCartProduct(CartItem);
    CartInputPort.repository.storeItem<CartItem>(CartItem);
  }

  static increaseQuantityOfProduct(id: CartItemId) {
    let cartItems = CartInputPort.getCartProducts();
    //@ts-ignore
    let item: CartItem = cartItems.find((item) => item.id === id);

    item.quantity += 1;

    CartInputPort.repository.updateItem(id, item);
  }

  static getCartProducts(): CartItem[] {
    return CartInputPort.repository.getItems<CartItem>();
  }

  static deleteProduct(id: CartItemId) {
    CartInputPort.repository.deleteItem(id);
  }
};

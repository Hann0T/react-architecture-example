import { CartItem } from 'cart/CartItem';
import { CartItemId } from 'cart/CartItemId';
import { CartUseCase } from 'cart/CartUseCase';
import { ProductId } from 'product/ProductId';
import { DataPersistenceOutputPort } from 'dataPersistence/DataPersistenceOutputPort';
import { ProductOutOfStockError } from 'errors/ProductOutOfStockError';
import { ProductHasAlreadyBeenAddedError } from 'errors/ProductHasAlreadyBeenAddedError';

export const CartInputPort: CartUseCase = class {
  static repository: DataPersistenceOutputPort;

  static registerRepository(repository: DataPersistenceOutputPort): void {
    CartInputPort.repository = repository;
  }

  static saveCartProduct(CartItem: CartItem): void {
    if (CartItem.product.stock <= 0) {
      throw new ProductOutOfStockError('out of stock');
    }

    if (CartInputPort.hasProduct(CartItem.product.id)) {
      throw new ProductHasAlreadyBeenAddedError(
        'the product has already been added to the cart',
      );
    }

    CartInputPort.repository.storeItem<CartItem>(CartItem);
  }

  static increaseQuantityOfProduct(id: CartItemId) {
    let cartItems = CartInputPort.getCartProducts();
    //@ts-ignore
    let item: CartItem = cartItems.find((item) => item.id === id);

    item.quantity += 1;

    CartInputPort.repository.updateItem(id, item);
  }

  static decreaseQuantityOfProduct(id: CartItemId) {
    let cartItems = CartInputPort.getCartProducts();
    //@ts-ignore
    let item: CartItem = cartItems.find((item) => item.id === id);

    item.quantity -= 1;

    CartInputPort.repository.updateItem(id, item);
  }

  static getCartProducts(): CartItem[] {
    return CartInputPort.repository.getItems<CartItem>();
  }

  static hasProduct(id: ProductId): boolean {
    let items = CartInputPort.repository.getItems<CartItem>();
    return items.find((item) => item.product.id === id) ? true : false;
  }

  static deleteProduct(id: CartItemId) {
    CartInputPort.repository.deleteItem(id);
  }
};

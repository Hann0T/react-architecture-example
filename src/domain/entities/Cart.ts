import { CartItem } from '@domain/valueObjects/CartItem';
import { ProductId } from '@domain/valueObjects/ProductId';
import { ProductHasAlreadyBeenAddedError } from 'application/Errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'application/Errors/ProductOutOfStockError';

export class Cart {
  private items: CartItem[] = [];

  addCartProduct(item: CartItem): void {
    if (item.product.stock <= 0) {
      throw new ProductOutOfStockError('out of stock');
    }

    if (this.hasProduct(item.product.id)) {
      throw new ProductHasAlreadyBeenAddedError(
        'the product has already been added to the cart',
      );
    }

    this.items.push(item);
  }

  getCartProducts(): CartItem[] {
    return this.items;
  }

  getLastCartProduct(): CartItem {
    return this.items[this.items.length - 1];
  }

  hasProduct(id: ProductId): boolean {
    return this.items.find((cartItem) => cartItem.product?.id === id)
      ? true
      : false;
  }
}

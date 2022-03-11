import { CartItem } from 'cart/CartItem';
import { ProductId } from 'product/ProductId';
import { ProductHasAlreadyBeenAddedError } from 'errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'errors/ProductOutOfStockError';

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

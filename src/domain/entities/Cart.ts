import { Product } from '@domain/entities/Product';
import { ProductHasAlreadyBeenAddedError } from 'application/Errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'application/Errors/ProductOutOfStockError';

export class Cart {
  private items: Product[] = [];

  addProduct(product: Product): void {
    if (product.stock <= 0) throw new ProductOutOfStockError('out of stock');
    if (this.items.includes(product))
      throw new ProductHasAlreadyBeenAddedError(
        'the product has already been added to the cart',
      );
    this.items.push(product);
  }

  getProducts(): Product[] {
    return this.items;
  }
}

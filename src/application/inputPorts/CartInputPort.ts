import { Cart } from 'domain/entities/Cart';
import { Product } from 'domain/entities/Product';

import { CartUseCase } from 'application/useCases/CartUseCase';
import { ProductOutputPort } from '@applicationoutputPorts/ProductOutputPort';

export const CartInputPort: CartUseCase = class {
  static createCart(): Cart {
    return new Cart();
  }

  static saveProduct(
    product: Product,
    repository: ProductOutputPort,
    cart?: Cart | null,
  ): void {
    if (!cart) cart = this.createCart();

    cart.addProduct(product);
    repository.saveProduct(product);
  }

  static getProductsFrom(repository: ProductOutputPort): Product[] {
    return repository.getProducts();
  }
};

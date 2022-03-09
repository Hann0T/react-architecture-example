import { Cart } from '@domain/entities/Cart';
import { Product } from '@domain/entities/Product';

import { ProductOutputPort } from '@applicationoutputPorts/ProductOutputPort';

export interface CartUseCase {
  createCart(): Cart;
  saveProduct(
    product: Product,
    repository: ProductOutputPort,
    cart?: Cart | null,
  ): void;
  getProductsFrom(repository: ProductOutputPort): Product[];
}

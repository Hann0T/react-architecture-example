import { Product } from '@domain/entities/Product';

export interface ProductOutputPort {
  saveProduct(product: Product): void;
  getProducts(): Product[];
}

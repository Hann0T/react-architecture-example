import { Product } from '@domain/entities/Product';
import { DataPersistenceOutputPort } from '@application/outputPorts/DataPersistenceOutputPort';

export interface ProductUseCase {
  createProduct(
    name: string,
    price: number,
    stock: number,
    id: string,
  ): Product;
  saveProduct(product: Product, repository: DataPersistenceOutputPort): void;
  getProductsFrom(repository: DataPersistenceOutputPort): Product[];
}

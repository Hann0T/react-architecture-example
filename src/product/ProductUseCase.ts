import { Product } from 'product/Product';
import { DataPersistenceOutputPort } from 'dataPersistence/DataPersistenceOutputPort';

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

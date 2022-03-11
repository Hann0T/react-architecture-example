import { Product } from 'product/Product';
import { ProductUseCase } from 'product/ProductUseCase';
import { DataPersistenceOutputPort } from 'dataPersistence/DataPersistenceOutputPort';

export const ProductInputPort: ProductUseCase = class {
  static createProduct(
    name: string,
    price: number,
    stock: number,
    id: string,
  ): Product {
    return new Product(name, price, stock, id);
  }

  static saveProduct(
    product: Product,
    repository: DataPersistenceOutputPort,
  ): void {
    repository.storeItem<Product>(product);
  }

  static getProductsFrom(repository: DataPersistenceOutputPort): Product[] {
    return repository.getItems<Product>();
  }
};

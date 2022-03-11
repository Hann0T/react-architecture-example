import { Product } from 'domain/entities/Product';
import { ProductUseCase } from '@application/useCases/ProductUseCase';
import { DataPersistenceOutputPort } from '@application/outputPorts/DataPersistenceOutputPort';

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

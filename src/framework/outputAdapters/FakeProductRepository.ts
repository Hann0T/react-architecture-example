import { ProductOutputPort } from 'application/outputPorts/ProductOutputPort';
import { Product } from 'domain/entities/Product';

export class FakeProductRepository implements ProductOutputPort {
  private items: Product[] = [];
  saveProduct(product: Product): void {
    this.items.push(product);
  }
  getProducts(): Product[] {
    return this.items;
  }
}

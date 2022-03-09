import { Product } from '@domain/entities/Product';
import { ProductOutputPort } from '@application/outputPorts/ProductOutputPort';

export class ProductLocalStorageRepository implements ProductOutputPort {
  private localStorageKey: string = 'PRODUCTLIST_V1';

  constructor() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }

  saveProduct(product: Product): void {
    let products: Product[] = this.getProducts();

    if (!products) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([product]));
      return;
    }

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify([...products, product]),
    );
  }

  getProducts(): Product[] {
    let products = JSON.parse(localStorage.getItem(this.localStorageKey) || '');
    return products;
  }
}

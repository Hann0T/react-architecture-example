import { Product } from 'domain/entities/Product';
import { ProductLocalStorageRepository } from 'framework/outputAdapters/ProductLocalStorageRepository';

class fakeLocalStorage {
  private store: any = {};

  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: any) {
    this.store[key] = value.toString();
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

describe('Local Storage Product Repository test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new fakeLocalStorage(),
    });
  });

  test('can save the products', () => {
    const product = new Product('productName', 12, 4000);

    const repository = new ProductLocalStorageRepository();

    repository.saveProduct(product);

    expect(repository.getProducts()).toContainEqual(product);
  });
});

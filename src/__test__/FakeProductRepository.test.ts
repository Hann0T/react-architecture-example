import { Product } from 'domain/entities/Product';
import { FakeProductRepository } from 'framework/outputAdapters/FakeProductRepository';

describe('Fake Product Repository test', () => {
  test('can save the products', () => {
    const product = new Product('productName', 12, 4000);

    const repository = new FakeProductRepository();

    repository.saveProduct(product);

    expect(repository.getProducts()).toContainEqual(product);
  });
});

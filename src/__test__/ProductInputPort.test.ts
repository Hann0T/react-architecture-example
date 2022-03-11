import { Product } from 'product/Product';
import { ProductInputPort } from 'product/ProductInputPort';
import { FakeLocalStorageRepository } from 'dataPersistence/FakeLocalStorageRepository';
import { IdGenerator } from 'utils/IdGenerator';

describe('Product InputPort test', () => {
  test('can create a new Product', () => {
    const product = ProductInputPort.createProduct(
      'productName',
      13,
      400,
      IdGenerator.generateId(),
    );
    expect(product).toBeInstanceOf(Product);
  });

  test('can store a product', () => {
    const product = ProductInputPort.createProduct(
      'productName',
      13,
      400,
      IdGenerator.generateId(),
    );
    const repository = new FakeLocalStorageRepository();

    ProductInputPort.saveProduct(product, repository);
    expect(ProductInputPort.getProductsFrom(repository)).toContainEqual(
      product,
    );
  });
});

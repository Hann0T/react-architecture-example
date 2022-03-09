import { Cart } from 'domain/entities/Cart';
import { Product } from 'domain/entities/Product';

import { CartInputPort } from 'application/inputPorts/CartInputPort';
import { FakeProductRepository } from 'framework/outputAdapters/FakeProductRepository';
import { ProductHasAlreadyBeenAddedError } from 'application/Errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'application/Errors/ProductOutOfStockError';

describe('Cart InputPort test', () => {
  test('can create a new Cart', () => {
    const cart = CartInputPort.createCart();

    expect(cart).toBeInstanceOf(Cart);
  });

  test('can save a product to the cart', () => {
    const cart = CartInputPort.createCart();
    const product = new Product('product', 15, 400);
    const repository = new FakeProductRepository();

    CartInputPort.saveProduct(product, repository, cart);

    expect(CartInputPort.getProductsFrom(repository)).toContainEqual(product);
  });

  test("can't add a product that doesn't have stock", () => {
    const cart = CartInputPort.createCart();
    const product = new Product('product', 15, 0);
    const repository = new FakeProductRepository();

    expect(() => {
      CartInputPort.saveProduct(product, repository, cart);
    }).toThrow(new ProductOutOfStockError('out of stock'));

    expect(repository.getProducts()).toHaveLength(0);
  });

  test("can't add a product that has already been added", () => {
    const cart = CartInputPort.createCart();
    const product = new Product('product', 15, 400);
    const repository = new FakeProductRepository();

    CartInputPort.saveProduct(product, repository, cart);

    expect(() => {
      CartInputPort.saveProduct(product, repository, cart);
    }).toThrow(
      new ProductHasAlreadyBeenAddedError(
        'the product has already been added to the cart',
      ),
    );

    expect(repository.getProducts()).toHaveLength(1);
  });
});

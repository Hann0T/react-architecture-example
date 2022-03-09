import { Cart } from 'domain/entities/Cart';
import { Product } from 'domain/entities/Product';
import { ProductHasAlreadyBeenAddedError } from 'application/Errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'application/Errors/ProductOutOfStockError';

describe('Cart behavior test', () => {
  test('can add a product to the cart', () => {
    const cart = new Cart();
    const product = new Product('product', 15, 400);

    cart.addProduct(product);

    expect(cart.getProducts()).toContainEqual(product);
  });

  test("can't add a product that doesn't have stock", () => {
    const cart = new Cart();
    const product = new Product('product', 15, 0);

    expect(() => {
      cart.addProduct(product);
    }).toThrow(new ProductOutOfStockError('out of stock'));
  });

  test("can't add a product that has already been added", () => {
    const cart = new Cart();
    const product = new Product('product', 15, 400);

    cart.addProduct(product);

    expect(() => {
      cart.addProduct(product);
    }).toThrow(
      new ProductHasAlreadyBeenAddedError(
        'the product has already been added to the cart',
      ),
    );
    expect(cart.getProducts()).toHaveLength(1);
  });
});

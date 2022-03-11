import { Cart } from 'domain/entities/Cart';
import { CartItem } from 'domain/valueObjects/CartItem';
import { CartInputPort } from 'application/inputPorts/CartInputPort';
import { ProductHasAlreadyBeenAddedError } from 'application/Errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'application/Errors/ProductOutOfStockError';
import { ProductInputPort } from 'application/inputPorts/ProductInputPort';
import { FakeLocalStorageRepository } from 'framework/outputAdapters/FakeLocalStorageRepository';
import { IdGenerator } from 'utils/IdGenerator';

describe('Cart InputPort test', () => {
  test('can get a Cart instance', () => {
    const cart = CartInputPort.cart;

    expect(cart).toBeInstanceOf(Cart);
  });

  test('can save a product to the cart', () => {
    CartInputPort.registerRepository(new FakeLocalStorageRepository());
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: ProductInputPort.createProduct(
        'product',
        15,
        400,
        IdGenerator.generateId(),
      ),
      quantity: 1,
    };

    CartInputPort.saveCartProduct(item);

    expect(CartInputPort.getCartProducts()[0]).toEqual(item);
  });

  test("can't add a product that doesn't have stock", () => {
    CartInputPort.registerRepository(new FakeLocalStorageRepository());
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: ProductInputPort.createProduct(
        'product',
        15,
        0,
        IdGenerator.generateId(),
      ),
      quantity: 1,
    };

    expect(() => {
      CartInputPort.saveCartProduct(item);
    }).toThrow(new ProductOutOfStockError('out of stock'));

    expect(CartInputPort.getCartProducts()).toHaveLength(0);
  });

  test("can't add a product that has already been added", () => {
    CartInputPort.registerRepository(new FakeLocalStorageRepository());
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: ProductInputPort.createProduct(
        'product',
        15,
        10,
        IdGenerator.generateId(),
      ),
      quantity: 1,
    };

    CartInputPort.saveCartProduct(item);

    expect(() => {
      CartInputPort.saveCartProduct(item);
    }).toThrow(
      new ProductHasAlreadyBeenAddedError(
        'the product has already been added to the cart',
      ),
    );

    expect(CartInputPort.getCartProducts()).toHaveLength(1);
  });

  test('can increase the quantity of a product', () => {
    CartInputPort.registerRepository(new FakeLocalStorageRepository());
    let item: CartItem = {
      id: IdGenerator.generateId(),
      product: ProductInputPort.createProduct(
        'product',
        15,
        10,
        IdGenerator.generateId(),
      ),
      quantity: 1,
    };

    CartInputPort.saveCartProduct(item);

    CartInputPort.increaseQuantityOfProduct(item.id);

    expect(CartInputPort.getCartProducts()[0].quantity).toEqual(2);
  });
  test('can delete a Product', () => {
    CartInputPort.registerRepository(new FakeLocalStorageRepository());
    let item: CartItem = {
      id: IdGenerator.generateId(),
      product: ProductInputPort.createProduct(
        'product',
        15,
        10,
        IdGenerator.generateId(),
      ),
      quantity: 1,
    };

    CartInputPort.saveCartProduct(item);

    CartInputPort.deleteProduct(item.id);

    expect(CartInputPort.getCartProducts()).toHaveLength(0);
  });
});

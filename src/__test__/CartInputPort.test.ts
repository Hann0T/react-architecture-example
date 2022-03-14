import { CartItem } from 'cart/CartItem';
import { CartInputPort } from 'cart/CartInputPort';
import { ProductInputPort } from 'product/ProductInputPort';
import { FakeLocalStorageRepository } from 'dataPersistence/FakeLocalStorageRepository';
import { ProductHasAlreadyBeenAddedError } from 'errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'errors/ProductOutOfStockError';
import { IdGenerator } from 'utils/IdGenerator';

describe('Cart InputPort test', () => {
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

  test('can decrease the quantity of a product', () => {
    CartInputPort.registerRepository(new FakeLocalStorageRepository());
    let item: CartItem = {
      id: IdGenerator.generateId(),
      product: ProductInputPort.createProduct(
        'product',
        15,
        10,
        IdGenerator.generateId(),
      ),
      quantity: 2,
    };

    CartInputPort.saveCartProduct(item);

    CartInputPort.decreaseQuantityOfProduct(item.id);

    expect(CartInputPort.getCartProducts()[0].quantity).toEqual(1);
  });

  test('has product', () => {
    CartInputPort.registerRepository(new FakeLocalStorageRepository());
    let item: CartItem = {
      id: IdGenerator.generateId(),
      product: ProductInputPort.createProduct(
        'product',
        15,
        10,
        IdGenerator.generateId(),
      ),
      quantity: 2,
    };

    CartInputPort.saveCartProduct(item);
    let hasProduct = CartInputPort.hasProduct(item.product.id);

    expect(hasProduct).toBeTruthy();
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

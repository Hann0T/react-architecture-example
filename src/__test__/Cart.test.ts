import { Cart } from 'cart/entities/Cart';
import { Product } from 'product/Product';
import { CartItem } from 'cart/CartItem';
import { ProductHasAlreadyBeenAddedError } from 'errors/ProductHasAlreadyBeenAddedError';
import { ProductOutOfStockError } from 'errors/ProductOutOfStockError';
import { IdGenerator } from 'utils/IdGenerator';

describe('Cart behavior test', () => {
  test('can add a product to the cart', () => {
    const cart = new Cart();
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: new Product('product', 15, 400, IdGenerator.generateId()),
      quantity: 1,
    };

    cart.addCartProduct(item);

    expect(cart.getLastCartProduct()).toEqual(item);
  });

  test('has product?', () => {
    const cart = new Cart();
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: new Product('product', 15, 1, IdGenerator.generateId()),
      quantity: 1,
    };

    cart.addCartProduct(item);

    expect(cart.hasProduct(item.product.id)).toBeTruthy();
  });

  test('get last product', () => {
    const cart = new Cart();
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: new Product('product', 15, 1, IdGenerator.generateId()),
      quantity: 1,
    };
    const item2: CartItem = {
      id: IdGenerator.generateId(),
      product: new Product('product', 15, 1, IdGenerator.generateId()),
      quantity: 1,
    };
    cart.addCartProduct(item);
    cart.addCartProduct(item2);

    expect(cart.getLastCartProduct()).toEqual(item2);
  });

  test("can't add a product that doesn't have stock", () => {
    const cart = new Cart();
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: new Product('product', 15, 0, IdGenerator.generateId()),
      quantity: 1,
    };

    expect(() => {
      cart.addCartProduct(item);
    }).toThrow(new ProductOutOfStockError('out of stock'));
    expect(cart.getCartProducts()).toHaveLength(0);
  });

  test("can't add a product that has already been added", () => {
    const cart = new Cart();
    const item: CartItem = {
      id: IdGenerator.generateId(),
      product: new Product('product', 15, 2, IdGenerator.generateId()),
      quantity: 1,
    };

    cart.addCartProduct(item);

    expect(() => {
      cart.addCartProduct(item);
    }).toThrow(
      new ProductHasAlreadyBeenAddedError(
        'the product has already been added to the cart',
      ),
    );
    expect(cart.getCartProducts()).toHaveLength(1);
  });
});

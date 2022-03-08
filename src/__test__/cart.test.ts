import { Cart } from 'domain/entities/Cart';
import { Item } from 'domain/entities/Item';

describe('Cart behavior test', () => {
  test('can add an item to the cart', () => {
    const cart = new Cart();
    const item = new Item('product', 15, 400);

    cart.addItem(item);

    expect(cart.getItems()).toContainEqual(item);
  });

  test('cannot add an item that has already added', () => {
    const cart = new Cart();
    const item = new Item('product', 15, 400);

    cart.addItem(item);
    cart.addItem(item);

    expect(cart.getItems()).toHaveLength(1);
  });
});

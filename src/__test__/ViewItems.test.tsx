import { shallow } from 'enzyme';

import { ItemCard } from 'framework/common/ItemCard';
import { Item } from 'domain/entities/Item';
import { Cart } from 'domain/entities/Cart';

describe('View Test Suit', () => {
  test('The item should have the information', () => {
    const data = {
      name: 'product',
      price: 5,
      stock: 10,
    };

    const wrapper = shallow(
      <ItemCard name={data.name} price={data.price} stock={data.stock} />,
    );

    expect(wrapper.find('h3#productName').text()).toMatch(/product/);
    expect(wrapper.find('p#productPrice').text()).toEqual('5');
    expect(wrapper.find('p#productStock').text()).toEqual('10');
  });

  test('The cart should have the items were added', () => {
    const item = new Item('productName', 10, 1000);
    const cart = new Cart();
  });
});

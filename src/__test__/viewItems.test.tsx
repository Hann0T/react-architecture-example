import { shallow } from 'enzyme';

import { Item } from 'framework/common/Item';

describe('View Test Suit', () => {
  test('The item should have the information', () => {
    const data = {
      name: 'product',
      price: 5,
      stock: 10,
    };

    const wrapper = shallow(
      <Item name={data.name} price={data.price} stock={data.stock} />,
    );

    expect(wrapper.find('h3#productName').text()).toMatch(/product/);
    expect(wrapper.find('p#productPrice').text()).toEqual('5');
    expect(wrapper.find('p#productStock').text()).toEqual('10');
  });
});

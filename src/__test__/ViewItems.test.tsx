import { shallow } from 'enzyme';

import { ProductItemView } from 'views/common/ProductItemView';

describe('View Test Suit', () => {
  test('The product should have the information', () => {
    const data = {
      id: 'id-test',
      name: 'product',
      price: 5,
      stock: 10,
    };

    const wrapper = shallow(
      <ProductItemView
        id={data.id}
        name={data.name}
        price={data.price}
        stock={data.stock}
      />,
    );

    expect(
      wrapper.find('div[data-product-id]').prop('data-product-id'),
    ).toEqual('id-test');
    expect(wrapper.find('h3#productName').prop('data-product-name')).toEqual(
      'product',
    );
    expect(wrapper.find('p#productPrice').prop('data-product-price')).toEqual(
      5,
    );
    expect(wrapper.find('p#productStock').prop('data-product-stock')).toEqual(
      10,
    );
  });

  /* test('The cart should have the items were added', () => {
*    const item = new Item('productName', 10, 1000);
*    const cart = new Cart();

*    cart.addItem(item);

*    const wrapper = shallow(<CartView />);

*    expect(wrapper.find('h2').text()).toMatch(/productName/);
*  }); */
});

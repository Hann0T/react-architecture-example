import React from 'react';

import { LocalStorageRepository } from 'dataPersistence/LocalStorageRepository';
import { CartInputPort } from 'cart/CartInputPort';
import { ProductInputPort } from 'product/ProductInputPort';
import { IdGenerator } from 'utils/IdGenerator';

import { CartContext } from './CartContext';

interface Props {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export const ProductItemView: React.FC<Props> = ({
  id,
  name,
  price,
  stock,
}: Props) => {
  const { setCartItems } = React.useContext(CartContext);

  React.useEffect(() => {
    CartInputPort.registerRepository(new LocalStorageRepository('CART_V1'));
  }, []);

  const handleClick = (): void => {
    try {
      CartInputPort.saveCartProduct({
        id: IdGenerator.generateId(),
        product: ProductInputPort.createProduct(name, price, stock, id),
        quantity: 1,
      });
      setCartItems(CartInputPort.getCartProducts());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div data-product-id={id} className='shadow-md p-4'>
      <h3 id='productName' className='text-xl' data-product-name={name}>
        {name}
      </h3>
      <p id='productPrice' data-product-price={price}>
        Price: ${price}
      </p>
      <p id='productStock' data-product-stock={stock}>
        Stock: {stock}
      </p>
      <div>
        <button
          className={`${
            stock
              ? 'bg-blue-300  hover:bg-blue-500'
              : 'bg-red-300 hover:bg-red-500'
          }  py-2 px-4 mt-2 cursor-pointer`}
          onClick={handleClick}
          type='button'
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

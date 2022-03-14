import React from 'react';

import { CartInputPort } from 'cart/CartInputPort';
import { Product } from 'product/Product';
import { CartContext } from './CartContext';

interface Props {
  id: string;
  product: Product;
  quantity: number;
}

export const CartItemView: React.FC<Props> = ({
  id,
  product,
  quantity,
}: Props) => {
  const [inputNumber, setInputNumber] = React.useState(quantity);
  const { setCartItems } = React.useContext(CartContext);

  const handleClick = () => {
    CartInputPort.deleteProduct(id);
    setCartItems(CartInputPort.getCartProducts());
  };
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(parseInt(ev.target.value));
  };

  return (
    <div id={id} className='p-2 my-2 shadow-md'>
      <h4 className='text-xl'>{product.name}</h4>
      <div className='flex my-2 justify-between items-center'>
        <label className='text-sm mr-2'>quantity:</label>
        <input
          type={'number'}
          min='1'
          value={inputNumber}
          onChange={handleChange}
          className='border-2 border-gray-500'
        />
      </div>
      <button
        type='button'
        onClick={handleClick}
        className='bg-red-300 px-2 py-1 hover:bg-red-500'
      >
        remove
      </button>
    </div>
  );
};

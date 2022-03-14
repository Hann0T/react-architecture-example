import React from 'react';

import { CartContext } from './CartContext';
import { CartItemView } from './CartItemView';

export const CartView: React.FC = () => {
  const { cartItems } = React.useContext(CartContext);
  return (
    <div className='px-4'>
      <h2 className='uppercase text-2xl'>cart</h2>
      <div className='flex flex-col'>
        {cartItems?.map((item) => (
          <CartItemView
            key={item.id}
            id={item.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
      {cartItems?.length ? (
        <button
          type='button'
          className='bg-green-300 p-2 font-semibold hover:bg-green-500'
        >
          Proceed to checkout
        </button>
      ) : (
        <p>Add something</p>
      )}
    </div>
  );
};

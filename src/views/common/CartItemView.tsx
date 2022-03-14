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
  const [price, setPrice] = React.useState(product.price);
  const [inputNumber, setInputNumber] = React.useState(quantity);
  const { setCartItems } = React.useContext(CartContext);

  const handleClick = () => {
    CartInputPort.deleteProduct(id);
    setCartItems(CartInputPort.getCartProducts());
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(ev.target.value);
    handleQuantity(quantity, newQuantity);
    setInputNumber(newQuantity);
    setPrice(newQuantity * product.price);
  };

  const handleQuantity = (oldQuantity: number, newQuantity: number) => {
    oldQuantity < newQuantity
      ? CartInputPort.increaseQuantityOfProduct(id)
      : CartInputPort.decreaseQuantityOfProduct(id);
  };

  return (
    <div id={id} className='p-2 my-2 shadow-md'>
      <h4 className='mb-2 text-xl'>{product.name}</h4>
      <p className='mb-2'>${price}</p>
      <div className='flex mb-2 justify-between items-center'>
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

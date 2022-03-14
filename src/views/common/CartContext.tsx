import React, { createContext, useState } from 'react';

import { CartItem } from 'cart/CartItem';
import { CartInputPort } from 'cart/CartInputPort';
import { LocalStorageRepository } from 'dataPersistence/LocalStorageRepository';

interface Value {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

//@ts-ignore
export const CartContext = createContext<Value>(undefined);

export const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  React.useEffect(() => {
    CartInputPort.registerRepository(new LocalStorageRepository('CART_V1'));
  }, []);

  React.useEffect(() => {
    setCartItems(CartInputPort.getCartProducts());
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

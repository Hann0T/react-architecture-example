import React from 'react';

import { Product } from 'product/Product';
import { ProductInputPort } from 'product/ProductInputPort';
import { LocalStorageRepository } from 'dataPersistence/LocalStorageRepository';

import { Header } from './Header';
import { CartView } from './CartView';
import { ProductList } from './ProductList';
import { ProductItemView } from './ProductItemView';
import { CartContextProvider } from './CartContext';
import { Modal } from './Modal';

const App: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    setProducts(
      ProductInputPort.getProductsFrom(
        new LocalStorageRepository('PRODUCTS_V1'),
      ),
    );
  }, []);

  return (
    <>
      <Header />
      <div className='container mx-auto my-10 grid grid-cols-[1.5fr_0.5fr]'>
        <CartContextProvider>
          <ProductList>
            {products?.map((product) => (
              <ProductItemView
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                stock={product.stock}
              />
            ))}
          </ProductList>
          <CartView />
        </CartContextProvider>
        <Modal></Modal>
      </div>
    </>
  );
};

export default App;

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
  const [isOpenModal, setIsOpenModal] = React.useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<String>('');
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
                setOpenModal={setIsOpenModal}
                setError={setErrorMessage}
              />
            ))}
          </ProductList>
          <CartView />
        </CartContextProvider>
        {isOpenModal ? (
          <Modal>
            <div className='flex flex-col p-5 bg-white'>
              <p className='text-xl'> {errorMessage}</p>
              <button
                type='button'
                onClick={() => setIsOpenModal(false)}
                className='mt-5 bg-blue-500 hover:bg-blue-700 text-white'
              >
                ok
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
    </>
  );
};

export default App;

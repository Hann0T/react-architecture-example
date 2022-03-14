import React from 'react';

export const ProductList: React.FC = ({ children }) => {
  return <ul className='grid grid-cols-2 gap-5'>{children}</ul>;
};

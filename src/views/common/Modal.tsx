import React from 'react';
import ReactDOM from 'react-dom';

export const Modal: React.FC = ({ children }) =>
  ReactDOM.createPortal(
    <div className='absolute inset-0 flex justify-center items-center'>
      <div className='absolute w-full h-full bg-black opacity-80'></div>
      <div className='z-10'>{children}</div>
    </div>,
    document.getElementById('modal-container') as HTMLElement,
  );

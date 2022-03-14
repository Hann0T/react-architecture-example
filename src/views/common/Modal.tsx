import React from 'react';
import ReactDOM from 'react-dom';

export const Modal: React.FC = ({ children }) =>
  ReactDOM.createPortal(
    { children },
    document.getElementById('modal-container') as HTMLElement,
  );

'use client';

import { Bounce, ToastContainer } from 'react-toastify';

export function ToastifyContainer() {
  return (
    <ToastContainer
      position='top-center'
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Bounce}
    />
  );
}

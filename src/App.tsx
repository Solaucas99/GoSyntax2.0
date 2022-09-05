import React from 'react';
import AOS from 'aos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppRoutes } from './Routes';
import { GlobalDiv } from './Styles/GlobalDiv';

import 'aos/dist/aos.css';
import ContextProvider from './Providers/ContextProvider';

function App() {
  AOS.init();

  return (
    <GlobalDiv>
      <ContextProvider>
        <AppRoutes />
      </ContextProvider>
      <ToastContainer theme="colored" />
    </GlobalDiv>
  );
}

export default App;

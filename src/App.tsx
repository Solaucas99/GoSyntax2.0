import React from 'react';
import AOS from 'aos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalDiv } from './Styles/GlobalDiv';

import 'aos/dist/aos.css';
import ContextProvider from './Providers/ContextProvider';
import Home from './Pages/Home';

function App() {
  AOS.init();

  return (
    <GlobalDiv>
      <ContextProvider>
        <Home />
      </ContextProvider>
      <ToastContainer theme="colored" />
    </GlobalDiv>
  );
}

export default App;

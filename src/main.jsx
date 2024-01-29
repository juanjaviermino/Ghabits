import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './/context/store.js';
import { PrimeReactProvider } from 'primereact/api';
import { locale, addLocale } from 'primereact/api';
import esLocale from './assets/es.json';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';  

addLocale('es', esLocale);
locale('es');

import AppUnauth from './AppUnauth.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_CLIENT_ID;

const RootComponent = () =>{
  return (
    <>
        <GoogleOAuthProvider clientId="494167253654-aqmvm4ahbufv1qk03c8qgltl1bi0tm84.apps.googleusercontent.com">
          <Provider store={store}>
            <PrimeReactProvider>
              <AppUnauth />
            </PrimeReactProvider>
          </Provider>
        </GoogleOAuthProvider>
    </>
);
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <RootComponent />
)



import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import rootReducer from './Redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Add Redux Store 2024.08.19
const store = configureStore({reducer : rootReducer})

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
  //<ThemeUIpro theme={theme}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </BrowserRouter>
  //</ThemeUIpro>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { createStore } from 'redux';
import rootReducer from './Redux';
import { Provider } from 'react-redux';

// Add Redux Store 2024.08.19
// TODO!! update to Redux Toolkit
const store = createStore(rootReducer);

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

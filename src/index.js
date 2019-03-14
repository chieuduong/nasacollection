import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppProcess } from './App';
import { store } from './helpers'

ReactDOM.render(
  <Provider store={store}>
    <AppProcess />
  </Provider>
  , document.getElementById('root')
);
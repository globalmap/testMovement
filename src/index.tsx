import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

declare global {
  interface Window {
    player: any,
    configurator: any,
    threekitPlayer: any
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

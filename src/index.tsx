import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from "react-redux";

declare global {
  interface Window {
    threekitPlayer: any;
    player: any;
    configurator: any;
    points: any,
    models: string[]
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

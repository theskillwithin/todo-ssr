import 'babel-polyfill';
import App from './components/App';
import {applyMiddleware, createStore} from 'redux';
//import FormDataPolyfill from 'formdata-polyfill';
import promise from 'redux-promise-middleware';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

// TODO :: https://github.com/jimmywarting/FormData/issues/24
/*if (typeof window.FormData ==='undefined' || typeof window.FormData.prototype.get === 'undefined') {
  window.FormData = FormDataPolyfill;
}*/

const store = createStore(reducer, applyMiddleware(promise()));

const annoying = document.createElement('div');
document.body.appendChild(annoying);

const entryPoint = (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(entryPoint, annoying);
registerServiceWorker();

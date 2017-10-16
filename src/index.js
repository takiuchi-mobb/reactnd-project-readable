import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import * as categoryActions from './actions/category';
import * as postActions from './actions/post';

import { BrowserRouter } from 'react-router-dom'
import store from './store';

store.dispatch(categoryActions.fetchCategories());
store.dispatch(postActions.fetchPosts());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker()
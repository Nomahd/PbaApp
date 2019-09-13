import React, {Component} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducers/reducers';
import AppWrapper from './components/AppWrapper';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    );
  }
}

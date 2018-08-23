import * as React from 'react';
import { Router } from 'react-router-dom';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import './App.css';
// import './antd-mobile.css';

import history from './history';
import CoreLayout from './layouts/coreLayout';
import { configureStore } from './store/createStore';
import { IEMStore } from './models/IEMStore';

const initialState = window.__INITIAL_STATE__;
const store: Store<IEMStore> = configureStore(initialState);

class App extends React.Component {
  public render() {
//    alert('press any key to continue');
    return (
      <Provider store={store}>
        <Router history={history}>
          <CoreLayout />
        </Router>
      </Provider>
    );
  }
}

export default App;

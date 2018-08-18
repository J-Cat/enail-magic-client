import * as React from 'react';
import { Router } from 'react-router-dom';

import './App.css';

import history from './history';
import CoreLayout from './layouts/coreLayout';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <CoreLayout />
      </Router>
    );
  }
}

export default App;

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './home';
import { Settings } from './settings';

export class Routes extends React.Component {
    public render() {
        return (
            <Switch>
              <Route path="/settings" component={Settings} />
              <Route component={Home} />
            </Switch>
        )
    }
}
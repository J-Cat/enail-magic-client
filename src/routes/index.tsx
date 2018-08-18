import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from './Home';
import { Profiles } from './Profiles';

export class Routes extends React.Component {
    public render() {
        return (
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/profiles" component={Profiles} />
            </Switch>
        )
    }
}
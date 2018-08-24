import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

import history from '../history';
import { Routes } from '../routes';

class CoreLayout extends React.Component<RouteComponentProps<any>, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className='App'>
                <TabBar>
                    <TabBar.Item 
                        title="Home" key="Home" 
                        icon={<FontAwesomeIcon icon={faHome} />}
                        selectedIcon={<FontAwesomeIcon icon={faHome} />}
                        selected={history.location.pathname.toLowerCase().indexOf('home') >= 0 || history.location.pathname.length === 0 ? true : false}
                        onPress={() => this.props.history.push('Home')}>
                        <Routes />
                    </TabBar.Item>
                    <TabBar.Item 
                        title="Profiles" key="Profiles" 
                        icon={<FontAwesomeIcon icon={faCogs} />}
                        selectedIcon={<FontAwesomeIcon icon={faCogs} />}
                        selected={history.location.pathname.toLowerCase().indexOf('profiles') >= 0 ? true : false}
                        onPress={() => this.props.history.push('Profiles')}>
                        <div className="Content">
                            <Routes />
                        </div>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default withRouter(CoreLayout);
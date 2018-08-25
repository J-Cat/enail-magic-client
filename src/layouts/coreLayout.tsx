import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { TabBar } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

import history from '../history';
import { Routes } from '../routes';

import './coreLayout.less';

import { ICoreLayoutState } from './container';

export class CoreLayout extends React.Component<RouteComponentProps<any>, ICoreLayoutState> {
    private ptr: JSX.Element;

    constructor(props: any) {
        super(props);

        let index: number = 0;

        const path: string[] = this.props.history.location.pathname.split('/');
        if (path.length > 0) {
            switch (path[path.length-1].toLowerCase()) {
                case 'settings': {
                    index = 1;
                    break;
                }
            }
        }

        this.state = {
            selectedTab: index
        };
    }

    public selectTab = (index: number, routeName: string) => {
        this.setState({
            selectedTab: index
        })
        history.push(routeName);
    }

    public render() {
        return (
            <div className='core-layout'>
                <TabBar unselectedTintColor='#fff' tintColor='#7ABA71'>
                    <TabBar.Item 
                        title="Home" key="Home" 
                        icon={<FontAwesomeIcon icon={faHome} />}
                        selectedIcon={<FontAwesomeIcon icon={faHome} />}
                        selected={this.state.selectedTab === 0}
                        onPress={() => this.selectTab(0, 'Home')}>
                        <Routes />
                    </TabBar.Item>
                    <TabBar.Item 
                        title="Settings" key="Settings" 
                        icon={<FontAwesomeIcon icon={faCogs} />}
                        selectedIcon={<FontAwesomeIcon icon={faCogs} />}
                        selected={this.state.selectedTab === 1}
                        onPress={() => this.selectTab(1, 'Settings')}>
                        <Routes />
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}
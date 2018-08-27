import * as React from 'react';
import { TabBar, PullToRefresh } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs } from '@fortawesome/free-solid-svg-icons';

import history from '../history';
import { Routes } from '../routes';

import './coreLayout.less';

import { CoreLayoutProps } from './container';

export class CoreLayout extends React.Component<CoreLayoutProps.IProps, CoreLayoutProps.IState> {
    constructor(props: CoreLayoutProps.IProps) {
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
            selectedTab: index,
            refreshing: false,
            down: true,
            height: window.innerHeight
        };
    }

    public selectTab = (index: number, routeName: string) => {
        this.setState({
            selectedTab: index
        })
        history.push(routeName);
    }

    public componentWillMount() {
        window.addEventListener('resize', this.resize);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    public resize = () => {
        this.setState({
            height: window.innerHeight,
        })
    }

    public render() {
        return (
            <PullToRefresh
                getScrollContainer={() => document.documentElement}
                distanceToRefresh={50}
                damping={60}
                style={{
                    height: this.state.height
                }}
                indicator={this.state.down ? {} : { activate: '1', deactivate: 'release to refresh' }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.props.connecting}
                onRefresh={() => {
                    this.props.connectBle();
                    this.setState({ refreshing: true });
                    setTimeout(() => {
                        this.setState({ refreshing: false });
                    }, 1000);
                }}
            >
                <div className="tab-bar-container" style={{height: this.state.height}}>
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
            </PullToRefresh>
        );
    }
}
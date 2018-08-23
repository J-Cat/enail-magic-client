import * as React from 'react';
import { Drawer, NavBar, Icon, List } from 'antd-mobile';

export class Profiles extends React.Component<{}, { docked: boolean, [key: string]: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            docked: false
        }
    }
    public onDock = (key: string) => {
        this.setState({
            [key]: !this.state[key],
        });
    }

    public render() {
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                    >Category</List.Item>);
                }
                return (<List.Item key={index}
                >Category{index}</List.Item>);
            })}
        </List>);

        return (<div style={{ height: '100%' }}>
            <NavBar icon={<Icon type="ellipsis" />} onLeftClick={() => this.onDock('docked')}>
                Docked in document
            </NavBar>
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebarStyle={{ border: '1px solid #ddd' }}
                sidebar={sidebar}
                docked={this.state.docked}
            >
                Click upper-left corner
            </Drawer>
        </div>);
    }
}
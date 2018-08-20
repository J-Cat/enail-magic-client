import * as React from 'react';
import { Button } from 'antd-mobile';
import { HomeProps } from './container';

export class Home extends React.Component<HomeProps.IProps, HomeProps.IState> {
    constructor(props: HomeProps.IProps) {
        super(props);

        this.state = {
            status: 'Connect'
        }
    }

    public componentWillMount() {
        try {
            ble.isEnabled(() => {
                this.setState({status: 'Enabled'});
            }, () => {
                this.setState({status: 'Bluetooth is not enabled'});
            });
        } catch (exc) {
            this.setState({status: 'Error getting Bluetooth status.'});
        }

        
    }

    public render() {
        return (
            <div>
                <div>{this.props.temperature}</div>
                <br/>
                <Button type="primary" onClick={(props) => {this.props.connectBle()}} disabled={this.props.connected}>Connect</Button>
                <Button type="primary" onClick={(props) => {this.props.getProfiles()}}>Get Profiles</Button>
            </div>
        );
    }
}
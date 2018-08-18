import * as React from 'react';

namespace Home {
    interface IDispatchProps {
    }

    interface IOwnProps {
    }

    export interface IProps extends IDispatchProps, IOwnProps {
    }

    export interface IState {
        status: string;
    }
}

export class Home extends React.Component<Home.IProps, Home.IState> {
    constructor(props: Home.IProps) {
        super(props);

        this.state = {
            status: ''
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
        return this.state.status;
    }
}
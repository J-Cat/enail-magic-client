import * as React from 'react';
import { Button } from 'antd-mobile';
import { HomeProps } from './container';

export class Home extends React.Component<HomeProps.IProps, HomeProps.IState> {
    constructor(props: HomeProps.IProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <div>{this.props.temperature}</div>
                <br/>
                <div>{this.props.profiles.length > 0 ? this.props.profiles[0].title : ''}</div>
                <br/>
            </div>
        );
    }
}
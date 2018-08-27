/*
 * File: c:\enail-magic-client\src\components\temperature\temperature.tsx
 * Project: c:\enail-magic-client
 * Created Date: Thursday August 23rd 2018
 * Author: J-Cat
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * License: 
 *    This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 
 *    International License (http://creativecommons.org/licenses/by-nc/4.0/).
 * -----
 * Copyright (c) 2018
 */
import * as React from 'react';
import { StatusProps } from './container';

import './status.less';
import { Progress } from 'antd-mobile';

export class Status extends React.Component<StatusProps.IProps, StatusProps.IState> {
    constructor(props: StatusProps.IProps) {
        super(props);
    }

    public render() {
        return (
            !this.props.status ? <div /> : (
                <div className="status-container">
                    <div className="status-container-progress">
                        <Progress percent={this.props.percentComplete} />
                    </div>
                    <div className="status-container-status">
                        {this.props.step!.type}
                    </div>
                </div>
            )
        );
    }
}
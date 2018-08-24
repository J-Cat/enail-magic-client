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
import { TemperatureProps } from './container';

import './temperature.less';

export class Temperature extends React.Component<TemperatureProps.IProps, TemperatureProps.IState> {
    constructor(props: TemperatureProps.IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="Temperature">
                {this.props.temperature}
            </div>
        );
    }
}
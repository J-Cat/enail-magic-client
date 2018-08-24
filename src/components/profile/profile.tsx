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
import { ProfileProps } from './container';
import { Progress } from 'antd-mobile';
import { GradientSvg } from '../gradientSvg';

import './profile.less';

export class Profile extends React.Component<ProfileProps.IProps, ProfileProps.IState> {
    constructor(props: ProfileProps.IProps) {
        super(props);
    }

    public render() {
        
       return (
            <div className="Profile">
                <GradientSvg
                    startColor="red"
                    endColor="blue"
                    idCSS="profileSvg"
                    rotation={90}
                />
                <Progress
                    percent={.7}
                    className="progressGradient"
                />      
                <div>
                    {this.props.profile.title}
                </div>
            </div>
        );
    }
}
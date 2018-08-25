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
import { Progress } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faStopCircle, faWrench } from '@fortawesome/free-solid-svg-icons';

import './profile.less';
import { Button } from 'antd-mobile';

export class Profile extends React.Component<ProfileProps.IProps, ProfileProps.IState> {
    constructor(props: ProfileProps.IProps) {
        super(props);

        this.state = {
            progressWidth: this.getProgressWidth(),
            commandRunning: false
        }
    }

    public componentWillMount() {
        window.addEventListener('resize', this.resize);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    public resize = () => {
        this.setState({
            progressWidth: this.getProgressWidth(),
            commandRunning: false
        })
    }

    private getProgressWidth = (): number => {
        const vUsedSpace: number = 60 + (
            window.innerHeight <= 400 ? 80 : (
                window.innerHeight <= 500 ? 120 : 150
            )
        );
        const padding: number[] = window.innerWidth <= 480 ? [10, 90 + vUsedSpace] : (
            window.innerWidth <= 1024 ? [20, 110 + vUsedSpace] : [30, vUsedSpace]
        );
        
        if (window.innerWidth - padding[0] < window.innerHeight - padding[1]) {
            return Math.max((window.innerWidth - padding[0])  - padding[1], 125);
        } else {
            return Math.max((window.innerHeight - padding[1]) - padding[1], 125);
        }
    }

    private getStatusIcon(): JSX.Element {
        if (this.props.status) {
            return <FontAwesomeIcon icon={faStopCircle} />;
        } else {
            return <FontAwesomeIcon icon={faPlayCircle} />;
        }
    }

    protected runProfile = () => {
        if (this.state.commandRunning) {
            return;
        }

        this.props.runProfile(this.props.profileIndex);

        this.postRunCommand();
    }

    protected setProfile = (index: number) => {
        if (this.state.commandRunning) {
            return;
        }

        this.props.setProfile(index);
        
        this.postRunCommand();
    }

    private postRunCommand = () => {
        this.setState({
            commandRunning: true
        });
        setTimeout(() => {
            this.setState({
                commandRunning: false
            });
        }, 2000);
    }

    public render() {
       return (
            <div className="profile">
                <div className='profile-progress'>
                    <Progress
                        percent={this.props.percentComplete}
                        type="circle"
                        strokeWidth={14}
                        width={this.state.progressWidth}
                        format={() => ''}
                    />
                    <div className="status-button-container">
                        <Button className="status-button" onClick={this.runProfile}>
                            {this.getStatusIcon()}
                        </Button>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="wing" />
                    <div className="profile-content-title">{this.props.profile.title}</div>
                    <Button className="profile-content-button"><FontAwesomeIcon icon={faWrench} /></Button>
                    <div className="wing" />
                </div>
            </div>
        );
    }
}
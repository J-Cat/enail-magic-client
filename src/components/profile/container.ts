/*
 * File: c:\enail-magic-client\src\components\temperature\container.tsx
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
import { IEMStore } from '../../models/IEMStore';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Profile } from './profile';
import { IProfile } from '../../models/IProfile';
import { setProfile, setStatus } from '../../modules/enailMagic';

export namespace ProfileProps {
    export interface IStateProps {
        status: boolean;
        percentComplete: number;
    }

    export interface IDispatchProps {
        setProfile: (index: number) => void;
        setStatus: (status: boolean) => void;
    }

    export interface IOwnProps {
        profile: IProfile;
    }

    export interface IProps extends RouteComponentProps<any>, IStateProps, IDispatchProps, IOwnProps {
    }

    export interface IState {
        progressWidth: number;
        commandRunning: boolean;
    }
}

function mapStateToProps(state: IEMStore, ownProps: ProfileProps.IOwnProps) {
    return {
        status: state.state.data.status,
        percentComplete: (state.state.data.status === true ? 
            Math.round(state.state.data.stepIndex / state.state.profiles[state.state.data.profileIndex].steps.length * 10) / 10
            : 0
        )
    };
}

function mapDispatchToProps(dispatch: (...args: any[]) => void) {
    return {
        setProfile: (index: number) => dispatch(setProfile),
        setStatus: (status: boolean) => dispatch(setStatus)
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(Profile));
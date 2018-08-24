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

export namespace ProfileProps {
    export interface IStateProps {        
        profile: IProfile;
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps {
    }

    export interface IProps extends RouteComponentProps<any>, IStateProps, IDispatchProps, IOwnProps {
    }

    export interface IState {
    }
}

function mapStateToProps(state: IEMStore, ownProps: ProfileProps.IOwnProps) {
    return {
        profile: state.state.profiles[state.state.data.profileIndex]
    };
}

function mapDispatchToProps(dispatch: (...args: any[]) => void) {
    return {
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(Profile));
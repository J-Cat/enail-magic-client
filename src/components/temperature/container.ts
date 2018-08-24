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
import { Temperature } from './temperature';

export namespace TemperatureProps {
    export interface IStateProps {        
        temperature: number;
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

function mapStateToProps(state: IEMStore, ownProps: TemperatureProps.IOwnProps) {
    return {
        temperature: state.state.data.temperature,
    };
}

function mapDispatchToProps(dispatch: (...args: any[]) => void) {
    return {
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(Temperature));
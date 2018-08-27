/*
 * File: c:\enail-magic-client\src\layouts\container.tsx
 * Project: c:\enail-magic-client
 * Created Date: Friday August 24th 2018
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
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CoreLayout } from './coreLayout';
import { IEMStore } from '../models/IEMStore';
import { connectBle } from '../modules/enailMagic';
import { connect } from 'react-redux';

export namespace CoreLayoutProps {
    export interface IStateProps {        
        connected: boolean;
        connecting: boolean;
    }

    export interface IDispatchProps {
        connectBle: () => void;
    }
    export type OwnProps = RouteComponentProps<{}>;
    
    export interface IProps extends IStateProps, IDispatchProps, OwnProps {
    }
    
    export interface IState {
        selectedTab: number
        refreshing: boolean;
        down: boolean;
        height: number;
    }
}

const mapStateToProps = (state: IEMStore, ownProps: CoreLayoutProps.OwnProps): CoreLayoutProps.IStateProps => ({
    connected: state.state.connected,
    connecting: state.state.connecting
});

const mapDispatchToProps = (dispatch: (...args: any[]) => void) => ({
    connectBle: () => dispatch(connectBle()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoreLayout));

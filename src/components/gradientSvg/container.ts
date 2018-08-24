/*
 * File: c:\enail-magic-client\src\components\gradientSvg\container.tsx
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
import { GradientSVG } from './gradientSvg';

export namespace GradientSvgProps {
    export interface IStateProps {        
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps {
        startColor: string;
        endColor: string;
        idCSS: string;
        rotation: number;
    }

    export interface IProps extends RouteComponentProps<any>, IStateProps, IDispatchProps, IOwnProps {
    }

    export interface IState {
    }
}

function mapStateToProps(state: IEMStore, ownProps: GradientSvgProps.IOwnProps) {
    return {
    };
}

function mapDispatchToProps(dispatch: (...args: any[]) => void) {
    return {
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(GradientSVG));
import { IEMStore } from '../../models/IEMStore';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Home } from './home';
import { connectBle, getProfiles } from '../../modules/enailMagic';

export namespace HomeProps {
    export interface IStateProps {        
        temperature: number;
        connected: boolean;
    }

    export interface IDispatchProps {
        connectBle: () => void;
        getProfiles: () => void;
    }

    export interface IOwnProps {
    }

    export interface IProps extends RouteComponentProps<any>, IStateProps, IDispatchProps, IOwnProps {
    }

    export interface IState {
        status: string;
    }
}

function mapStateToProps(state: IEMStore, ownProps: HomeProps.IOwnProps) {
    return {
        temperature: state.state.data.temperature,
        connected: state.state.connected
    };
}

function mapDispatchToProps(dispatch: (...args: any[]) => void) {
    return {
        connectBle: () => dispatch(connectBle()),
        getProfiles: () => dispatch(getProfiles())
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(Home));
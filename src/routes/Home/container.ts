import { IEMStore } from '../../models/IEMStore';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Home } from './home';
import { connectBle, /*, getProfiles */ 
setProfile} from '../../modules/enailMagic';
import { IProfile } from '../../models/profile';

export namespace HomeProps {
    export interface IStateProps {        
        temperature: number;
        connected: boolean;
        connecting: boolean;
        profiles: IProfile[];
        currentProfileIndex: number;
    }

    export interface IDispatchProps {
        connectBle: () => void;
        setProfile: (index: number) => void;
    }

    export interface IOwnProps {
    }

    export interface IProps extends RouteComponentProps<any>, IStateProps, IDispatchProps, IOwnProps {
    }

    export interface IState {
        commandRunning: boolean;
        currentIndex: number;
        mainWidth: number;
    }
}

function mapStateToProps(state: IEMStore, ownProps: HomeProps.IOwnProps) {
    return {
        temperature: state.state.data.temperature,
        connected: state.state.connected,
        connecting: state.state.connecting,
        profiles: state.state.profiles,
        currentProfileIndex: state.state.data.profileIndex
    };
}

function mapDispatchToProps(dispatch: (...args: any[]) => void) {
    return {
        connectBle: () => dispatch(connectBle()),
        setProfile: (index: number) => dispatch(setProfile(index))
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(Home));
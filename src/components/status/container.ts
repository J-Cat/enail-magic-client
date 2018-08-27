import { IEMStore } from '../../models/IEMStore';
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Status } from './status';
import { IStep, IProfile } from '../../models/profile';

export namespace StatusProps {
    export interface IStateProps {     
        profile?: IProfile;   
        step?: IStep;
        status: boolean;
        percentComplete: number;
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps extends RouteComponentProps<{}> {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps {
    }

    export interface IState {
    }
}

function mapStateToProps(state: IEMStore, ownProps: StatusProps.IOwnProps) {
    const profile: IProfile | undefined = state.state.data.profileIndex < state.state.profiles.length
        ? state.state.profiles[state.state.data.profileIndex]
        : undefined;
    const step: IStep | undefined = !!profile ? state.state.data.stepIndex < profile.steps.length ? profile.steps[state.state.data.stepIndex] : undefined : undefined;
    return {
        status: state.state.data.status,
        percentComplete: state.state.data.stepPercentComplete,
        profile,
        step
    };
}

function mapDispatchToProps(dispatch: (...args: any[]) => void) {
    return {
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Status));
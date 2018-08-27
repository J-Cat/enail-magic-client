import { ActionCreator } from 'redux';
import { IEMState } from '../models/IEMState';
import { EMAction, IEMBleAction, IEMUpdateBleConnectionAction, IEMBleDataAction, IEMBleChunkedRequestAction } from '../models/IEMAction';
import * as EMConstants from './constants';
import { Guid } from '../helpers/guid';

// initial state
const initialState: IEMState = {
    data: {
        temperature: 0,
        status: false,
        profileIndex: 0,
        stepIndex: 0,
        percentComplete: 0,
        stepPercentComplete: 0
    },
    profiles: [],
    readData: {},
    connected: false,
    connecting: false
};

// action creators
export const connectBle: ActionCreator<IEMBleAction> = () => {
    return {
        type: EMConstants.EM_CONNECT_BLE_ACTION,
        uuid: ''
    };
}

export const disconnectBle: ActionCreator<IEMBleAction> = () => {
    return {
        type: EMConstants.EM_DISCONNECT_BLE_ACTION,
        uuid: ''
    };
}

export const updateBleConnection: ActionCreator<IEMUpdateBleConnectionAction> = (status: boolean) => {
    return {
        type: EMConstants.EM_UPDATE_BLE_CONNECTION,
        uuid: '',
        connectionStatus: status
    };
}

export const getProfiles: ActionCreator<IEMBleChunkedRequestAction> = () => {
    return {
        type: EMConstants.EM_FROMCLIENT_GETPROFILES,
        uuid: EMConstants.EM_PROFILES_CHARACTERISTIC_UUID,
        key: Guid.newGuid()
    };
}

export const setProfile: ActionCreator<IEMBleAction> = (index:number) => {
    return {
        type: EMConstants.EM_FROMCLIENT_SET_PROFILE,
        uuid: EMConstants.EM_CHARACTERISTIC_UUID,
        value: index
    };

}

export const runProfile: ActionCreator<IEMBleAction> = (index: number) => {
    return {
        type: EMConstants.EM_FROMCLIENT_RUNPROFILE,
        uuid: EMConstants.EM_CHARACTERISTIC_UUID,
        value: index
    }
}

export const enailMagicReducer = (state: IEMState = initialState, action: EMAction) => {
    switch (action.type) {
        case EMConstants.EM_CONNECT_BLE_ACTION: {
            return Object.assign({}, state, {
                connecting: true
            });
        }

        case EMConstants.EM_DISCONNECT_BLE_ACTION: {
            return Object.assign({}, state, {
                connecting: false,
                connected: false
            });
        }

        
        case EMConstants.EM_UPDATE_BLE_CONNECTION: {
            return Object.assign({}, state, {
                connecting: false,
                connected: action.connectionStatus
            });
        }

        case EMConstants.EM_FROMSERVER_PROFILES: {
            const profilesStr: string = (!!state.readData[action.key] ? state.readData[action.key] : '') + action.chunk;
            if (action.complete) {
                // store to local storage
                localStorage.setItem('EMPROFILE', profilesStr);
                const s: string = Buffer.from(profilesStr, 'base64').toString('utf8');
                return Object.assign({}, state, {
                    readData: Object.assign({}, state.readData, {
                        [action.key]: undefined
                    }),
                    profiles: JSON.parse(s)
                });
            } else {
                return Object.assign({}, state, {
                    readData: Object.assign({}, state.readData, {
                        [action.key]: profilesStr
                    }),
                });                
            }
        }

        case EMConstants.EM_FROMSERVER_DATA: {
            const data: number[] = (action as IEMBleDataAction).data
            return Object.assign({}, state, {
                data: {
                    temperature: data[0],
                    status: data[1] === 1,
                    profileIndex: data[2],
                    stepIndex: data[3],
                    percentComplete: data[4],
                    stepPercentComplete: data[5]
                }
            });
        }

        default: {
            return state;
        }
    }
}
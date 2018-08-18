import { ActionCreator } from 'redux';
import { IEMState } from '../models/IEMState';
import { EMAction, IEMBleAction, IEMUpdateBleConnectionAction, IEMBleDataAction } from '../models/IEMAction';
import * as EMConstants from './constants';
import { IProfile } from '../models/IProfile';

// initial state
const initialState: IEMState = {
    data: {
        profileIndex: 0,
        status: 0,
        stepIndex: 0,
        temperature: 0
    },
    profiles: []
};

// action creators
export const connectBle: ActionCreator<IEMBleAction> = () => {
    return {
        type: EMConstants.EM_CONNECT_BLE_ACTION,
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

export const getProfiles: ActionCreator<IEMBleAction> = () => {
    return {
        type: EMConstants.EM_READBLE_REQUEST,
        uuid: EMConstants.EM_PROFILES_CHARACTERISTIC_UUID
    };
}

export const completeBleReadRequest: ActionCreator<IEMBleAction> = (uuid: string, value: any) => {
    return {
        type: EMConstants.EM_READBLE_RESPONSE,
        uuid,
        value
    };
}

export const enailMagicReducer = (state: IEMState = initialState, action: EMAction) => {
    switch (action.type) {
        case EMConstants.EM_CONNECT_BLE_ACTION: {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    status: 0
                })
            });
        }

        case EMConstants.EM_UPDATE_BLE_CONNECTION: {
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, {
                    status: (action as IEMUpdateBleConnectionAction).connectionStatus
                })
            });
        }

        case EMConstants.EM_READBLE_RESPONSE: {
            switch (action.uuid) {
                case EMConstants.EM_PROFILES_CHARACTERISTIC_UUID: {
                    return Object.assign({}, state, {
                        profiles: (action.value as IProfile[])
                    });
                }

                default: {
                    return state;
                }
            }
        }

        case EMConstants.EM_FROMSERVER_UPDATEDATA: {
            return Object.assign({}, state, {
                data: (action as IEMBleDataAction).data
            });
        }

        default: {
            return state;
        }
    }
}
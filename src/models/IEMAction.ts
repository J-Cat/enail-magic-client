import { Action } from 'redux';
import { IEMData } from './IEMData';

export type EMAction = IEMBleAction & IEMConnectBleAction & IEMUpdateBleConnectionAction & IEMBleDataAction & IEMBleResponseAction;

export interface IEMConnectBleAction extends IEMBleAction {
    connectionPromise: Promise<{deviceId: string, characteristics: string[]}>;
}

export interface IEMUpdateBleConnectionAction extends IEMBleAction {
    connectionStatus: boolean
}

export interface IEMBleDataAction extends IEMBleAction {
    data: IEMData;
}

export interface IEMBleAction extends Action {
    uuid: string;
    error?: string;
}

export interface IEMBleResponseAction extends IEMBleAction {
    value: any
}
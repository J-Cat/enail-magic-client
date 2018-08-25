import { Action } from 'redux';

export type EMAction = IEMBleAction & IEMConnectBleAction & IEMUpdateBleConnectionAction & IEMBleDataAction & IEMBleChunkedAction & IEMBleSetValueAction;

export interface IEMConnectBleAction extends IEMBleAction {
    connectionPromise: Promise<{deviceId: string, characteristics: string[]}>;
}

export interface IEMUpdateBleConnectionAction extends IEMBleAction {
    connectionStatus: boolean
}

export interface IEMBleDataAction extends IEMBleAction {
    data: number[];
}

export interface IEMBleAction extends Action<string|number> {
    uuid: string;
    error?: string;
}

export interface IEMBleChunkedRequestAction extends IEMBleAction {
    key: string;
}

export interface IEMBleChunkedAction extends IEMBleAction {
    key: string;
    complete: boolean;
    chunk: string;
}

export interface IEMBleSetValueAction extends IEMBleAction {
    value: number;
}
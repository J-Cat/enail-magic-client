import { IProfile } from './IProfile';
import { IEMData } from './IEMData';

export interface IEMState {
    readonly profiles: IProfile[];
    readonly data: IEMData;
    readonly readData: {
        [key: string]: string;
    },
    readonly connected: boolean;
}
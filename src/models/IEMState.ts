import { IProfile } from './IProfile';
import { IEMData } from './IEMData';

export interface IEMState {
    readonly profiles: IProfile[];
    readonly data: IEMData;
}
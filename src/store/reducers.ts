import { combineReducers, Reducer } from 'redux';
import { IEMStore } from '../models/IEMStore';
import { enailMagicReducer } from '../modules/enailMagic';

const makeRootReducer: Reducer<IEMStore> = 
    combineReducers({
        state: enailMagicReducer
    });

export default makeRootReducer;
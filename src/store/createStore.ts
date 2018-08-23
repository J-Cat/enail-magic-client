import * as EMConstants from '../modules/constants';
import makeRootReducer from './reducers';
import {
    applyMiddleware,
    compose,
    createStore,
    Store
} from 'redux';
import { bleMiddleware } from './bleMiddleware';
import { connectBle } from '../modules/enailMagic';
import { Guid } from '../helpers/guid';
import { IEMStore } from '../models/IEMStore';
import { IProfile } from '../models/IProfile';
// import { composeWithDevTools } from 'remote-redux-devtools';


export function configureStore(initialState?: IEMStore): Store<IEMStore> {
    const middlewares: any = [
        bleMiddleware
    ];

    const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    // const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000, hostname: '172.19.0.29' })

    const newState = initialState || {} as IEMStore;
    const store: Store<IEMStore> = createStore(makeRootReducer, newState,         
        composeEnhancers(applyMiddleware(...middlewares))
    );

    // either connect to bluetooth, or fudge the store for development in non
    // phone environment
    if (window.cordova) {
        store.dispatch(connectBle());
    } else {
        const profiles: IProfile[] = require('../models/profiles.json');
        store.dispatch({
            type: EMConstants.EM_FROMSERVER_PROFILES,
            complete: true,
            key: Guid.newGuid(),
            chunk: new Buffer(JSON.stringify(profiles)).toString('base64')
        });
        store.dispatch({
            type: EMConstants.EM_FROMSERVER_DATA,
            data: {
                temperature: 72,
                status: 0,
                profileIndex: 0,
                stepIndex: 0
            }
        });
    }

    return store;

}
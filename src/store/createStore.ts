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
import { IProfile } from '../models/profile';
// import { composeWithDevTools } from 'remote-redux-devtools';

export function configureStore(initialState?: IEMStore): Store<IEMStore> {
    const middlewares: any = [
        bleMiddleware
    ];

    const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    // const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000, hostname: '172.19.0.29' })

    // import saved profiles from cache (speed up load time)
    const newState = importLocalStorage(initialState || {} as IEMStore);

    const store: Store<IEMStore> = createStore(makeRootReducer, newState,         
        composeEnhancers(applyMiddleware(...middlewares))
    );

    // either connect to bluetooth, or fudge the store for development in non
    // phone environment
    if (window.cordova) {
        store.dispatch(connectBle());
    } else {
        const profiles: IProfile[] = require('../models/profile/profiles.json');
        store.dispatch({
            type: EMConstants.EM_FROMSERVER_PROFILES,
            complete: true,
            key: Guid.newGuid(),
            chunk: new Buffer(JSON.stringify(profiles)).toString('base64')
        });
        store.dispatch({
            type: EMConstants.EM_FROMSERVER_DATA,
            data: [72, 1, 0, 0]
        });
        store.dispatch({
            type: EMConstants.EM_UPDATE_BLE_CONNECTION,
            connectionStatus: true
        });
    }

    return store;

}

const importLocalStorage = (initialState: IEMStore): IEMStore => {
    try {
        const profileStr: string | null = localStorage.getItem('EMPROFILE');
        if (!!profileStr && profileStr !== null) {
            const s: string = Buffer.from(profileStr, 'base64').toString('utf8');
            return Object.assign({}, initialState, {
                profiles: JSON.parse(s)
            });
        }
    } catch (e) { // error occured ... delete profile from local storage (just cache anyways)
        console.log(e);
        try {
            localStorage.removeItem('EMPROFILE');
        } catch (e1) {
            console.log(e1);
        }
    }
    return initialState;
}
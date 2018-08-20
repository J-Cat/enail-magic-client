import { applyMiddleware, compose, createStore, Store } from 'redux';

import { IEMStore } from '../models/IEMStore';
import makeRootReducer from './reducers';
import { connectBle } from '../modules/enailMagic';

import { bleMiddleware } from './bleMiddleware';

export function configureStore(initialState?: IEMStore): Store<IEMStore> {
    const middlewares: any = [
        bleMiddleware
    ];

    const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const newState = initialState || {} as IEMStore;
    const store: Store<IEMStore> = createStore(makeRootReducer, newState, composeEnhancers(applyMiddleware(...middlewares)));

    store.dispatch(connectBle());

    return store;

}
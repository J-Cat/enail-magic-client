import { applyMiddleware, compose, createStore, Store, Middleware } from 'redux';

import { IEMStore } from '../models/IEMStore';
import makeRootReducer from './reducers';

import { bleMiddleware } from './bleMiddleware';
import { IEMBleAction } from '../models/IEMAction';

export function configureStore(initialState?: IEMStore): Store<IEMStore> {
    const middlewares: Array<Middleware<any>> = [
        bleMiddleware
    ];

    const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const newState = initialState || {} as IEMStore;
    const store: Store<IEMStore> = createStore<IEMStore, IEMBleAction, {}, {}>(makeRootReducer, newState, composeEnhancers(applyMiddleware(...middlewares)));

    return store;

}
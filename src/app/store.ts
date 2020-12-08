import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from '../epics/rootEpic';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory();

const epicMiddleware = createEpicMiddleware();
export const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [
        routerMiddleware(history),
        epicMiddleware,
    ],
});

epicMiddleware.run(rootEpic as any);

export type RootState = ReturnType<typeof store.getState>
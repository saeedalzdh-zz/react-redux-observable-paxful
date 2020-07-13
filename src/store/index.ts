import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { activeTradeReducer, tradesReducer, btcRatioReducer } from './trades/reducers';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { addMessageEpic, AllActions, loadBTCRatioEpic } from './trades/epics';
import { TradeState } from './trades/types';

const epicMiddleware = createEpicMiddleware<AllActions, AllActions, TradeState>();

const rootEpic = combineEpics(addMessageEpic, loadBTCRatioEpic);
const rootReducer = combineReducers({
	activeTrade: activeTradeReducer,
	trades: tradesReducer,
	btcRatio: btcRatioReducer,
});

const store = createStore(
	rootReducer,
	applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

export { store };

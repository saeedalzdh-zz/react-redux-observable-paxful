import {
	REMOVE_TRADE,
	ACTIVE_TRADE,
	ActiveTradeActionType,
	RemoveTradeActionType,
	ADD_MESSAGE,
	AddMessageActionType,
	LoadBtcRatioActionType,
	LOAD_BTC_RATIO
} from './types'
import { Trade } from '../../types';
import tradesData from '../../mock-data/trades';

const trades: Trade[] = tradesData;
const activeTrade: Trade = tradesData[0];

export const tradesReducer = (
	state: Trade[] = trades,
	action: RemoveTradeActionType | AddMessageActionType
): Trade[] => {
	switch (action.type) {
		case REMOVE_TRADE: {
			return [...state].reduce((trades: Trade[], trade: Trade) => (
				trade.id === action.payload ? [...trades] : [...trades, trade]
			), []);
		}
		case ADD_MESSAGE: {
			const addNewMessageToTradeMessages = (trade: Trade, newMessage: string): Trade => ({
				...trade,
				messages: [
					...trade.messages,
					{
						id: 1,
						content: newMessage,
						createdAt: new Date().toISOString(),
						owner: Math.random() < 0.50 ? 'buyer' : 'seller'
					},
				]
			});

			return [...state].reduce((trades: Trade[], trade: Trade) => (
				trade.id === action.payload.tradeId 
					? [...trades, addNewMessageToTradeMessages(trade, action.payload.message)] 
				: [...trades, trade]
			), []);
		}

		default:
			return state;
	}
}

export const activeTradeReducer = (state: number = activeTrade.id, action: ActiveTradeActionType): number  => {
	switch (action.type) {
		case ACTIVE_TRADE: {
			return action.payload;
		}

		default:
			return state;
	}
}

export const btcRatioReducer = (state: number = 0, action: LoadBtcRatioActionType): number  => {
	switch (action.type) {
		case LOAD_BTC_RATIO: {
			return action.payload;
		}

		default:
			return state;
	}
}

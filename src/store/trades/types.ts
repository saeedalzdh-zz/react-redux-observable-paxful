import { Trade } from "../../types";

export const REMOVE_TRADE = 'REMOVE_TRADE';
export const ACTIVE_TRADE = 'ACTIVE_TRADE';
export const ADD_MESSAGE_EPIC = 'ADD_MESSAGE_EPIC';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const LOAD_BTC_RATIO = 'LOAD_BTC_RATIO';
export const LOAD_BTC_RATIO_EPIC = 'LOAD_BTC_RATIO_EPIC';

export interface TradeState {
	trades: Trade[];
	activeTrade: number;
	btcRatio: number;
};

export type RemoveTradeActionType = {
	type: typeof REMOVE_TRADE;
	payload: number;
};

export type ActiveTradeActionType = {
	type: typeof ACTIVE_TRADE;
	payload: number;
};

export interface AddMessageActionType {
	type: typeof ADD_MESSAGE;
	payload: {
		tradeId: number;
		message: string;
	};
}

export interface AddMessageEpicActionType {
	type: typeof ADD_MESSAGE_EPIC;
	payload: {
		tradeId: number;
		message: string;
	};
}

export interface LoadBtcRatioActionType {
	type: typeof LOAD_BTC_RATIO;
	payload: number;
}

export interface LoadBtcRatioEpicActionType {
	type: typeof LOAD_BTC_RATIO_EPIC;
}
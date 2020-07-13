import {
	REMOVE_TRADE,
	ACTIVE_TRADE,	
	ADD_MESSAGE,
	RemoveTradeActionType,
	ActiveTradeActionType,
	AddMessageActionType,
	AddMessageEpicActionType,
	ADD_MESSAGE_EPIC,
	LoadBtcRatioEpicActionType,
	LOAD_BTC_RATIO_EPIC,
	LOAD_BTC_RATIO,
	LoadBtcRatioActionType
} from './types'

const removeTrade = (tradeId: number): RemoveTradeActionType => ({
	type: REMOVE_TRADE,
	payload: tradeId
});

const setTradeActive = (activeTrade: number): ActiveTradeActionType => ({
	type: ACTIVE_TRADE,
	payload: activeTrade
});

const addMessage = (tradeId: number, message: string): AddMessageActionType => ({
	type: ADD_MESSAGE,
	payload: {
		tradeId,
		message
	}
});

const addMessageEpic = (tradeId: number, message: string): AddMessageEpicActionType => ({
	type: ADD_MESSAGE_EPIC,
	payload: {
		tradeId,
		message
	}
});

const loadBTCRatio = (btcRatio: number): LoadBtcRatioActionType => ({
	type: LOAD_BTC_RATIO,
	payload: btcRatio
});

const loadBTCRatioEpic = (): LoadBtcRatioEpicActionType => ({
	type: LOAD_BTC_RATIO_EPIC
});

export {
	removeTrade,
	setTradeActive,
	addMessage,
	addMessageEpic,
	loadBTCRatio,
	loadBTCRatioEpic
}

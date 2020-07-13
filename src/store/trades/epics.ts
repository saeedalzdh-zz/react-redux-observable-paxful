import { delay, map, filter, mergeMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import {
	addMessage,
	loadBTCRatio
} from './actions';
import {
	AddMessageEpicActionType,
	AddMessageActionType,
	TradeState,
	ADD_MESSAGE_EPIC,
	LoadBtcRatioActionType,
	LoadBtcRatioEpicActionType,
	LOAD_BTC_RATIO_EPIC
} from "./types";
import { from } from 'rxjs';
import axios from "axios";

export type AllActions = AddMessageEpicActionType | AddMessageActionType | LoadBtcRatioActionType | LoadBtcRatioEpicActionType;

export const addMessageEpic: Epic<AllActions, AllActions, TradeState> = (
	action$
) =>
	action$.pipe(
		filter(isOfType(ADD_MESSAGE_EPIC)),
		delay(1000),
		map(action => addMessage(action.payload.tradeId, action.payload.message))
	);

export const loadBTCRatioEpic: Epic<AllActions, AllActions, TradeState> = (
	action$
) =>
	action$.pipe(
		filter(isOfType(LOAD_BTC_RATIO_EPIC)),
		mergeMap(() =>
			from(axios.get("https://api.coindesk.com/v1/bpi/currentprice/USD.json")).pipe(
				map(response => loadBTCRatio(response.data.bpi.USD.rate_float))
			)
		)
	);

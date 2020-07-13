import React, { useState, useContext, useEffect } from 'react';
import Avatar from '../Avatar/Avatar';
import './TradeItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Trade } from '../../types';
import { setTradeActive } from '../../store/trades/actions';
import { TradeState } from '../../store/trades/types';
import { HashContext } from '../App/App';
import { BtcRatioContext } from '../Trades/Trades';

interface Props {
	trade: Trade;
	onSelectTrade: () => void;
	onChangeRoute: (path: string) => void;
}

const TradeItem: React.FC<Props> = ({ trade, onSelectTrade, onChangeRoute }) => {
	const dispatch = useDispatch();
	const [seen, setSeen] = useState(!trade.unread);
	const trades = useSelector<TradeState, Trade[]>(({ trades }) => trades);
	const activeTradeId = useSelector<TradeState, number>(({ activeTrade }) => activeTrade);
	const routeHash = useContext(HashContext);
	const btcRatio = useContext(BtcRatioContext);

	let activeTrade = trades.find(trade => trade.id === activeTradeId);

	const { id, title, hash, trader, type, amount, currency, status } = trade;

	const handleSetTradeActive = (tradeId: number, hash: string): void => {
		dispatch(setTradeActive(tradeId));
		onChangeRoute(`/sell/trades/${hash}`);
		setSeen(true);
		onSelectTrade();
	}

	if (activeTrade && routeHash !== activeTrade.hash) {
		const activeTradeByHash: Trade | undefined = trades.find(trade => trade.hash === routeHash);

		if (activeTradeByHash) {
			activeTrade = activeTradeByHash;
			handleSetTradeActive(activeTradeByHash.id, activeTradeByHash.hash);
		}
	}

	const addActiveClassIfTradeIsActive = (): string => {
		if (activeTrade && activeTrade.id === id) {
			return 'trade--active';
		}

		return '';
	}

	const handleSeenTrade = (): object => seen ? {} : { borderLeft: '8px solid #56d3c3' };

	return (
		<div className={`trade ${addActiveClassIfTradeIsActive()}`} style={handleSeenTrade()} onClick={() => handleSetTradeActive(id, hash)}>
			<div className="trade__info">
				<div className="trade__info__title">{ trader.name } is { type }</div>
				<div className="trade__info__payment">{ title }</div>
				<div className="trade__info__amount">{amount} {currency.toUpperCase()} ({(amount / btcRatio).toFixed(8)} BTC)</div>
			</div>

			<div className="trade__avatar">
				<Avatar avatar={trader.avatar} />
				<div className={`trade__avatar__payment_status ${status === 'paid' ? 'trade__avatar__payment_status--paid' : ''}`}>
					{status.toUpperCase()}
					</div>
			</div>
		</div>
	)
};

export default TradeItem;
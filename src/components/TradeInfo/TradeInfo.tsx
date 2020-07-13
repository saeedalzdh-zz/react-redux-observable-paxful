import React, { useContext } from 'react';
import './TradeInfo.scss';
import Avatar from '../Avatar/Avatar';
import { useSelector } from 'react-redux';
import { Trade } from '../../types';
import moment from 'moment';
import { TradeState } from '../../store/trades/types';
import { BtcRatioContext } from '../Trades/Trades';

interface Props {
	visible: boolean;
	showInfoBackButton: boolean;
	onInfoBackButtonClick: () => void;
}

const TradeInfo: React.FC<Props> = ({ visible, showInfoBackButton, onInfoBackButtonClick }) => {
	const btcRatio = useContext(BtcRatioContext);
	const trades = useSelector<TradeState, Trade[]>(({ trades }) => trades);
	const activeTradeId = useSelector<TradeState, number>(({ activeTrade }) => activeTrade);
	const activeTrade = trades.find(trade => trade.id === activeTradeId);

	if (activeTrade && 'title' in activeTrade) {
		const { amount, hash, status, trader, createdAt } = activeTrade;

		return (
			<div className="trader" style={visible ? { display: 'flex' } : { display: 'none' }}>
				{
					showInfoBackButton && 
					<div className="trader__back" onClick={onInfoBackButtonClick}>
						<img src="/images/arrow-back.png" alt="" width="20" />
					</div>
				}
				<div className="trader__info">
					Your are trading with <b>{trader.name}</b>
				</div>

				<div className="trader__time">
					Started {moment(createdAt).fromNow()}
				</div>

				<div className="trader__release_bitcoins">
					Release bitcoins
				</div>

				<div className="trader__reputation">
					<Avatar avatar={trader.avatar} />
					<div className="trader__reputation__info">
						<span style={{ color: '#99db60' }}>+{trader.reputation.positive}</span> / <span style={{ color: '#dd3345' }}>-{trader.reputation.negetive}</span>
					</div>
				</div>

				<div className="trader__trades_counts">
					# OF TRADES <span className="trader__trades_counts__number">{trades.length}</span>
				</div>

				<div className="trader__item">
					<span>TRADE STATUS</span>
					<span className={`trader__item__status ${status === 'paid' ? 'trader__item__status--paid' : ''}`}>{status.toUpperCase()}</span>
				</div>

				<div className="trader__item">
					<span>TRADE HASH</span>
					<span>{hash}</span>
				</div>

				<div className="trader__item">
					<span>AMOUNT USD</span>
					<span>${amount}</span>
				</div>

				<div className="trader__item">
					<span>AMOUNT BTC</span>
					<span>{(amount / btcRatio).toFixed(8)}</span>
				</div>
			</div>
		)
	}

	return (
		<div className="trader" style={visible ? { display: 'flex' } : { display: 'none' }}>
			<p>Please select a trade ...</p>
		</div>
	)
	
};

export default TradeInfo;
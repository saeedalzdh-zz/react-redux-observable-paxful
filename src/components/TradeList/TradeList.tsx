import React, { useEffect } from 'react';
import './TradeList.scss';
import TradeItem from '../TradeItem/TradeItem';
import { useSelector, useDispatch } from 'react-redux';
import { Trade } from '../../types';
import { TradeState } from '../../store/trades/types';

interface Props {
	visible: boolean;
	onSelectTrade: () => void;
	onChangeRoute: (path: string) => void;
}

const TradeList: React.FC<Props> = ({ visible, onSelectTrade, onChangeRoute }) => {
	const trades = useSelector<TradeState, Trade[]>(({ trades }) => trades);

	if (trades && trades.length) {
		return (
			<div className="trades" style={visible ? { display: 'block' } : { display: 'none' }}>
				{trades.map(trade => 
					<TradeItem key={trade.id} trade={trade} onSelectTrade={onSelectTrade} onChangeRoute={onChangeRoute}/>
				)}
			</div>
		)
	}
	return (
		<div className="trades" style={visible ? { display: 'flex' } : { display: 'none' }}>
			No trade found.
		</div>
	)
};

export default TradeList;
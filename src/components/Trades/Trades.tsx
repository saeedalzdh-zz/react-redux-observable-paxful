import React, { lazy, useContext, useState, useEffect } from 'react';
import './Trades.scss';
import { DeviceContext } from '../App/App';
import { useDispatch, useSelector } from 'react-redux';
import { loadBTCRatioEpic } from '../../store/trades/actions';
import { TradeState } from '../../store/trades/types';

const TradeList = lazy(() => import('../TradeList/TradeList'));
const Messenger = lazy(() => import('../Messenger/Messenger'));
const TradeInfo = lazy(() => import('../TradeInfo/TradeInfo'));

export const BtcRatioContext = React.createContext(0);

interface Props {
	onChangeRoute: (path: string) => void;
}

const Trades: React.FC<Props> = ({ onChangeRoute }) => {
	const [visible, setVisible] = useState('trades');
	const device = useContext(DeviceContext);
	const distpach = useDispatch();

	useEffect(() => {
		distpach(loadBTCRatioEpic());
	});

	const btcRatio = useSelector<TradeState, number>(({ btcRatio }) => btcRatio);

	const handleSelectTrade = (): void => {
		if (device === 'mobile') {
			setVisible('messenger');
		}
	};

	const handleTradesButton = (): void => {
		setVisible('trades');
	}
	
	const handleInfoButtonClick = (): void => {
		setVisible('info');
	}

	const isTradesVisible = () => {
		return visible === 'trades' || device === 'desktop';
	}
	
	const isInfoVisible = () => {
		return (device !== 'mobile' && device !== 'tablet') || visible === 'info';
	}

	const isMessengerVisible = () => {
		return device !== 'mobile' || visible === 'messenger';
	}

	const handleInfoBackButtonClick = () => {
		setVisible('messenger');
	}

	return (
		<div className="app">
			<BtcRatioContext.Provider value={btcRatio}>
				<TradeList visible={isTradesVisible()} onSelectTrade={handleSelectTrade} onChangeRoute={onChangeRoute}/>
				<Messenger 
					visible={isMessengerVisible()} 
					onTradesButtonClick={handleTradesButton}
					onInfoButtonClick={handleInfoButtonClick}
					showTradesButton={!isTradesVisible()}
					showInfoButton={!isInfoVisible()}
				/>
				<TradeInfo visible={isInfoVisible()} onInfoBackButtonClick={handleInfoBackButtonClick} showInfoBackButton={!isMessengerVisible()}/>
			</BtcRatioContext.Provider>
		</div>
	)
};

export default Trades;
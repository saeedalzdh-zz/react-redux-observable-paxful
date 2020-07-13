import React, { useState, useEffect } from 'react';
import './Messenger.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Trade } from '../../types';
import MessageItem from '../MessageItem/MessageItem';
import { TradeState } from '../../store/trades/types';
import { addMessageEpic, removeTrade } from '../../store/trades/actions';

interface Props {
	visible: boolean;
	onTradesButtonClick: () => void;
	onInfoButtonClick: () => void;
	showTradesButton: boolean;
	showInfoButton: boolean;
}

const Messenger: React.FC<Props> = ({ visible, onTradesButtonClick, onInfoButtonClick, showTradesButton, showInfoButton }) => {
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');

	const trades = useSelector<TradeState, Trade[]>(({ trades }) => trades);
	const activeTradeId = useSelector<TradeState, number>(({ activeTrade }) => activeTrade);
	const activeTrade = trades.find(trade => trade.id === activeTradeId);

	const handleNewMessage = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.keyCode === 13 && event.shiftKey == false && message.length >= 2) {
			dispatch(addMessageEpic(activeTradeId, message));
			setMessage('');
		}
	}

	const handleSendClick = (): void => {
		dispatch(addMessageEpic(activeTradeId, message));
		setMessage('');
	}

	const handleChangeMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	}

	const handleDeleteTrade = (tradeId: number): void => {
		dispatch(removeTrade(tradeId))
	}

	if (activeTrade && 'title' in activeTrade) {
		const { title, trader, messages } = activeTrade;

		return (
			<div className="messenger" style={visible ? { display: 'flex' } : { display: 'none' }}>
				<div className="messenger__trade_info">
					{
						showTradesButton ?
						<div className="messenger__trade_info__back" onClick={onTradesButtonClick} >
							<img src="/images/arrow-back.png" alt="" width="20" />
						</div> : <div className="messenger__trade_info__back"></div>
					}
					<div className="messenger__trade_info__delete" onClick={() => handleDeleteTrade(activeTradeId)}>
						<img src="/images/trash.jpg" alt="" width="25" height="26" />
					</div>
					<div className="messenger__trade_info__wrapper">
						<div className="messenger__trade_info__wrapper__title">{title}</div>
						<div className="messenger__trade_info__wrapper__trader">Chanaaar <span style={{ color: '#99db60' }}>+{trader.reputation.positive}</span> / <span style={{ color: '#dd3345' }}>-{trader.reputation.negetive}</span> </div>
					</div>
					{
						showInfoButton ?
						<div className="messenger__trade_info__forward" onClick={onInfoButtonClick}>
							<img src="/images/info.png" alt="" width="25"/>
						</div> : <div className="messenger__trade_info__forward"></div>
					}
				</div>

				<div className="messenger__history">
					{messages.map((message, index) => <MessageItem key={index} message={message} trader={trader}/>)}
				</div>

				<div className="messenger__form">
					<input type="text" value={message} onChange={handleChangeMessageInput} className="messenger__form__input" placeholder="Type your message ..." onKeyDown={handleNewMessage}/>
					<button className="messenger__form__button" onClick={handleSendClick}>SEND</button>
				</div>
			</div>
		)
	}
	return (
		<div className="messenger messenger--no-selected" style={visible ? { display: 'flex' } : { display: 'none' }}>
			<p>Please select a trade ...</p>
		</div>
	)
	
};

export default Messenger;
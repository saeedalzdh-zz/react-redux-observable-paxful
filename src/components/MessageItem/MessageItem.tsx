import React from 'react';
import Avatar from '../Avatar/Avatar';
import { Message, Trader } from '../../types';
import moment from 'moment';

interface Props {
	message: Message;
	trader: Trader;
}

const MessageItem: React.FC<Props> = ({ message, trader }) => {
	const { content, createdAt, owner } = message;

	return (
		<div className={`messenger__history__message messenger__history__message--${owner}`}>
			<Avatar avatar={owner === 'seller' ? trader.avatar : '/images/avatar2.png'} />
			<div className={`messenger__history__message__wrapper  messenger__history__message__wrapper--${owner}`}>
				<div className={`messenger__history__message__content messenger__history__message__content--${owner}`}>
					<div className={`messenger__history__message__content__indicator messenger__history__message__content__indicator--${owner}`}></div>
					{content}
				</div>
				<div className="messenger__history__message__time">{moment(createdAt).format('LT')}</div>
			</div>
		</div>
	)
}

export default MessageItem;
import React, { lazy } from 'react';

const Nav = lazy(() => import('../Nav/Nav'));
const Trades = lazy(() => import('../Trades/Trades'));

interface Props {
	onChangeRoute: (path: string) => void;
}

const Sell: React.FC<Props> = ({ onChangeRoute }) => {
	return (
		<>
			<Nav />
			<Trades onChangeRoute={onChangeRoute} />
		</>
	)
};

export default Sell;
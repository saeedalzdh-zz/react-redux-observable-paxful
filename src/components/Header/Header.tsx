import React, { useContext } from 'react';
import './Header.scss';
import { DeviceContext } from '../App/App';

const Header: React.FC = () => {
	const device = useContext(DeviceContext);

	return (
		<header className="header">
			<img className="logo" src="/images/logo.png" alt="" height="60px" />

			{
				device !== 'mobile' ?
					<ul className="menu">
						<li className="menu__item">Buy bitcoins</li>
						<li className="menu__item menu__item--active">Sell bitcoins</li>
						<li className="menu__item">Wallet</li>
						<li className="menu__item">Support</li>
						<li className="menu__item">Your account</li>
					</ul> : 
					<ul className="menu">
						<li className="menu__item">Menu</li>
					</ul> 
			}
		</header>
	)
};

export default Header;
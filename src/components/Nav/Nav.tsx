import React from 'react';
import './Nav.scss';

const Nav: React.FC = () => {
	return (
		<nav>
			<ul className="nav">
				<li className="nav__item">Overview</li>
				<li className="nav__item nav__item--active">Trades</li>
				<li className="nav__item">Disputes</li>
				<li className="nav__item">Your Offers</li>
				<li className="nav__item">My Team</li>
				<li className="nav__item">Trade History</li>
			</ul>
		</nav>
	)
};

export default Nav;
import React, { lazy, useEffect, useState, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';

const Sell = lazy(() => import('../Sell/Sell'));
const Header = lazy(() => import('../Header/Header'));

interface MatchParams {
	hash: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export const HashContext = React.createContext('');
export const DeviceContext = React.createContext('mobile');

const App: React.FC<Props> = ({ history, match }) => {
	let device = 'tablet';

	const mobile = useMedia("(max-width: 700px)");
	const desktop = useMedia("(min-width: 980px)");

	if (mobile) {
		device = 'mobile';
	}

	if (desktop) {
		device = 'desktop';
	}

	const handleChangeRoute = (path: string): void => {
		history.push(path);
	}

	return (
		<DeviceContext.Provider value={device}>
			<Header></Header>

			<HashContext.Provider value={match.params.hash}>
				<Sell onChangeRoute={handleChangeRoute}/>
			</HashContext.Provider>
		</DeviceContext.Provider>
	)
};

function useMedia(query: any) {
	let [matches, setMatches] = useState(
		window.matchMedia(query).matches
	);

	useEffect(() => {
		let media = window.matchMedia(query);
		
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		let listener = () => setMatches(media.matches);

		media.addListener(listener);

		return () => media.removeListener(listener);
	}, [query]);

	return matches;
}

export default App;
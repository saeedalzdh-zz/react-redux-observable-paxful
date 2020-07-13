import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = lazy(() => import('../App/App'));

const Routes = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route exact path="/sell/trades/:hash" component={App} />
			</Switch>
		</Suspense>
	</Router>
);

export default Routes;

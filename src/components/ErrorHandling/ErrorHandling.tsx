import React, { PureComponent } from 'react';

class ErrorHandling extends PureComponent<{}, { hasError: boolean; }> {
	constructor(props: {}) {
		super(props);

		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		// log the error to an error reporting service currently simply log in console
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorHandling;
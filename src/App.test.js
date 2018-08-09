import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';




describe('App component', () => {
	it('renders without crashing', () => {
		ReactDOM.render(<App

		/>, document.createElement('div'));
	});
});


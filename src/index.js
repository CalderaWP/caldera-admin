import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import domReady from '@wordpress/dom-ready';

domReady( () => {

	const el = document.getElementById('caldera-forms-admin');
	if( null !== el ){
		ReactDOM.render(
			<App />,
			document.getElementById('caldera-forms-admin')
		);
	}

} );


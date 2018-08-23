import React from 'react';
import ReactDOM from 'react-dom';
import CalderaAdminWithState from './CalderaAdminWithState';
import domReady from '@wordpress/dom-ready';

domReady(() => {

	const el = document.getElementById('caldera-forms-admin');
	if (null !== el) {
		ReactDOM.render(
			<CalderaAdminWithState/>,
			document.getElementById('caldera-forms-admin')
		);

		//added folded class to .wp-admin elements so side menu is condensed.
		const wpBody = document.getElementsByClassName('wp-admin');
		let len = wpBody !== null ? wpBody.length : 0;
		let i = 0;
		for (i; i < len; i++) {
			wpBody[i].className += " folded caldera-admin-two-app-in-use";
		}
	}

});


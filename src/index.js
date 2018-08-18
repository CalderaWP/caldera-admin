import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



const el = document.getElementById('caldera-forms-admin');
if( null !== el ){
	ReactDOM.render(
		<App />,
		document.getElementById('caldera-forms-admin')
	);
}



import React from 'react';
import CalderaAdmin from '@caldera-labs/admin-client';
import './css/legacy/admin.css';

const {CalderaAdminWithState} = CalderaAdmin;

class App extends React.Component {

	render()
	{
		return (
			<CalderaAdminWithState />
		);
	}
}

export default App;

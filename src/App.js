import React from 'react';
import './css/legacy/admin.css';
import './css/admin-two.css';
import CalderaAdminScreen from '@caldera-labs/admin-client';
import {Provider} from 'react-redux';

const {CalderaAdminWithState,store} = CalderaAdminScreen;


class App extends React.Component {

	static loaded = false;


	constructor(props){
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount(){
		App.loaded = true;
		//this.props.setForms({});
	}


	render()
	{
		console.log(store.getState());
		return (
			<React.Fragment>
				<p>Hi Mike</p>
				<Provider store={store}>
					<CalderaAdminWithState/>
				</Provider>
			</React.Fragment>
		);
	}
}

export default App;

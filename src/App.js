import React from 'react';
import './css/legacy/admin.css';
import './css/admin-two.css';
import CalderaAdminScreen from '@caldera-labs/admin-client';
import * as CalderaState from '@caldera-labs/state';


const {actions} = CalderaState.store;
const {
	AdminApp,
	//dispatchers,
	//store,
	//apiClients,
	CalderaAdmin,
} = CalderaAdminScreen;



class App extends React.Component {



	constructor(props){
		super(props);
		this.state = {
			forms: {},
			entryViewerForm: '',
			entryPage: 1,
			entries: {}
		};
		this.app = new AdminApp();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.setFormsViaApi = this.setFormsViaApi.bind(this);
		this.setForms = this.setForms.bind(this);
		this.setEntryViewerForm = this.setEntryViewerForm.bind(this);
		this.createForm = this.createForm.bind(this);
		this.getTemplates = this.getTemplates.bind(this);
	}

	componentDidMount(){
		this.setFormsViaApi();

	}

	setEntryViewerForm(entryViewerForm){
		this.setState({entryViewerForm});
		this.app.getApiClients().entriesClient.getEntries(entryViewerForm,this.state.entryPage).then( entries => {
			this.setState({entries})
		});

	}

	setFormsViaApi(){
		this.app.getApiClients().formsAdminApiClient.getForms().then( r => {
			this.app.getStore().dispatch(
				actions.setForms(r)
			);
			this.setForms();
		});
	}

	setForms(){
		const _forms = this.app.getStore().getState()['CALDERA_FORMS/FORMS'].forms;
		const forms = false === Array.isArray(_forms) ? _forms : {};
		this.setState( {forms} );
	}


	createForm(newForm){
		this.app.getApiClients().formsAdminApiClient.createForm().then( r => {
			console.log(r);
			this.setFormsViaApi();
		});
	}

	getTemplates(){
		return this.app.getStore().getState()['CALDERA_FORMS/FORMS/TEMPLATES'];
	}

	render()
	{

		return (
			<React.Fragment>
				<CalderaAdmin
					forms={this.state.forms}
					openEntryViewerForForm={this.setEntryViewerForm}
					entries={this.state.entries}
					onCreateForm={this.createForm}
					templates={this.getTemplates()}
				/>
			</React.Fragment>
		);
	}
}

export default App;

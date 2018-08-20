import React from 'react';
import './css/legacy/admin.css';
import './css/admin-two.css';
import CalderaAdmin from './CalderaAdmin'
import apiClients from './apiClients';


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			forms: {},
			entryViewerForm: '',
			entryPage: 1,
			entries: {},
			loading: true,
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.setFormsViaApi = this.setFormsViaApi.bind(this);
		this.setForms = this.setForms.bind(this);
		this.setEntryViewerForm = this.setEntryViewerForm.bind(this);
		this.createForm = this.createForm.bind(this);
		this.getTemplates = this.getTemplates.bind(this);
		this.onEntryPageNav = this.onEntryPageNav.bind(this);
		this.getEntriesViaApi = this.getEntriesViaApi.bind(this);
	}

	componentDidMount(){
		this.setFormsViaApi();

	}


	getApiClients(){
		return apiClients;
	}

	onEntryPageNav(entryPage){
		this.setState({entryPage});
		this.getEntriesViaApi();


	}
	setEntryViewerForm(entryViewerForm : Object ){
		this.setState({entryViewerForm});
		this.getEntriesViaApi(entryViewerForm);

	}

	getEntriesViaApi() {
		this.getApiClients().entriesClient.getEntries(this.state.entryViewerForm, this.state.entryPage).then(entries => {
			this.setState({entries})
		});
	}

	setFormsViaApi(){
		this.getApiClients().formsAdminApiClient.getForms().then( r => {
			this.setState({
				loading: false
			});
			this.setForms(r);
		});
	}

	setForms(forms){
		this.setState( {forms} );
	}


	createForm(newForm){
		this.getApiClients().formsAdminApiClient.createForm().then( r => {
			this.setFormsViaApi();
		});
	}

	getTemplates(){
		return []
	}

	render()
	{

		return (
			<React.Fragment>
				<CalderaAdmin
					loading={this.state.loading}
					forms={this.state.forms}
					openEntryViewerForForm={this.setEntryViewerForm}
					entries={this.state.entries}
					onCreateForm={this.createForm}
					templates={this.getTemplates()}
					onEntryPageNav={this.onEntryPageNav}
					entryPage={this.props.entryPage}
				/>
			</React.Fragment>
		);
	}
}

export default App;

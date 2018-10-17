
import React, {Component} from 'react';
import type {calderaAdminProps} from "./types/calderaAdminProps";

import {cfAdmin} from "./apiClients";
import {FormsSection} from "./components/admin/FormsSection";
import {Admin} from '@caldera-labs/components'
import './css/legacy/admin.css';
import './css/admin-two.css';
import type {form, newFormOptions} from "./types/types/form";
import {formsAdminApiClient,entriesClient} from "./apiClients";
import type {formEntryViewerState} from "./types/states/formEntryViewerState";
import type {formEntry} from "./types/types/formEntry";
import {TopNav} from "./components/admin/TopNav";
import {statusType} from "./types/types/statusType";
import {Settings} from "./components/Settings/Settings";
import type {settingsType} from "./types/types/settings";
import HelpContent from "./components/admin/HelpContent";
import Grid from 'react-css-grid';
import Router from './Router';
import {NewForm} from "./components/NewForm/NewForm";

type Props = {
	...calderaAdminProps,
};

type State = {
	forms: Object,
	templates: Object,
	...formEntryViewerState,
	mainStatus: statusType,
	activeView: string,
	settings: settingsType
};


/**
 * Caldera (Forms) Admin with state provided
 */
class CalderaAdminWithState extends Component<Props, State> {

	state = {
		forms: cfAdmin.forms,
		templates: cfAdmin.templates,
		mainStatus: {
			loading: true,
			error: false,
			message: '',
			show: false
		},
		entryViewerForm: '',
		entryPage: 1,
		entries: {},
		currentEntry: 0,
		activeView: '',
		settings: cfAdmin.settings
	};

	constructor(props: Props) {
		super(props);
		(this: any).getFormsStore = this.getFormsStore.bind(this);
		(this: any).getFormEntryViewerState = this.getFormEntryViewerState.bind(this);
	}
	componentDidMount() {
		this.getFormsStore().setForms(cfAdmin.forms);
		this.setState({forms:cfAdmin.forms});
		this.setState({settings:cfAdmin.settings});
		this.setState({
			mainStatus: {
				...this.state.mainStatus,
				loading: false
			}
		});
	}



	getFormsStore() {
		/**
		 * Util function to set forms in state
		 *
		 * @param {Object} forms
		 */
		const setForms = (forms: Object) => {
			this.setState({forms});
		};

		const setForm = (formId: string, form: Object): void => {
			this.setState({
				forms: {
					...state.forms,
					[formId]: form
				}
			});
		};

		const state : State = this.state;

		return {
			/**
			 * Check if we have forms
			 * @return {Object|boolean}
			 */
			hasForms: (): boolean => {
				return state.forms && 0 !== Object.keys(state.forms).length;
			},
			/**
			 * Get all forms
			 * @return {Object}
			 */
			getForms: (): Object => {
				return state.forms;
			},
			/**
			 * (re)Set forms
			 * @param {Object}forms
			 */
			setForms: (forms: Object): void => {
				setForms(forms);
			},
			getTemplates: (): Object => {
				return state.templates;
			},
			getForm: (formId: string): ?form => {
				return state.forms.hasOwnProperty(formId)
					? state.forms[formId]
					: null
			},
			setForm: (formId: string, form: Object): void => {
				setForm(formId, form);
			},
			createForm: (newFormOptions: newFormOptions): Promise<any> => {
				return new Promise((resolve, reject) => {
					formsAdminApiClient.createForm(
						newFormOptions.name,
						{
							template: newFormOptions.template,
							clone: newFormOptions.clone,
						}
					).then(newForm => {
						setForm(newForm.ID, newForm);
						resolve(state.forms);
					}).catch(error => {
						resolve(error)
					});
				});
			},
		}
	}

	getFormEntryViewerState() 	{
		const {state} = this;

		const setEntries = (entries: Object) => {
			this.setState({
				entries
			});
		};
		const setEntryPage = (entryPage: Object): void => {
			this.setState({
				entryPage
			});
		};

		const setEntryViewerForm = (entryViewerForm: string): void => {
			this.setState({
				entryViewerForm
			});
		};

		const setCurrentEntry = (currentEntry: number): void => {
			this.setState({
				currentEntry
			});
		};


		return {
			getEntries: (): Object => {
				return state.entries;
			},
			setEntries: function (entries: Object): void {
				setEntries(entries);
			},
			setEntryPage: (entryPage: number): void => {
				setEntryPage(entryPage);
			},
			setEntryViewerForm: (entryViewerForm: string): void => {
				setEntryViewerForm(entryViewerForm);
			},
			getEntryViewerForm: (): ?string => {
				return state.entryViewerForm;
			},
			getEntry: (entryId: string): ?formEntry => {
				return state.entries.hasOwnProperty(entryId)
					? state.entries[entryId]
					: null;
			},
			deleteEntry: (entryId: string): Promise<any> => {
				return new Promise((resolve, reject) => {
					entriesClient.deleteEntry(
						state.entryViewerForm,
						entryId
					).then(entries => {
						setEntries(entries);
						resolve(entries);
					}).catch(error => {
						resolve(error)
					});
				});

			},
			resendEntry: (entryId: string): Promise<any> => {
				return new Promise((resolve, reject) => {
					entriesClient.resendEntry(
						state.entryViewerForm,
						entryId
					).catch(error => {
						resolve(error)
					});
				});
			},
			getEntriesViaApi(entryPage : ?number): Promise<any> {
				if( ! entryPage ){
					entryPage = state.entryPage;
				}
				return new Promise((resolve, reject) => {
					entriesClient.getEntries(
						state.entryViewerForm,
						entryPage
					).then(entries => {
						setEntries(entries);
					}).catch(error => {
						resolve(error)
					});
				});


			},
			getCurrentEntry(): formEntry {
				return state.currentEntry;
			},
			setCurrentEntry: (currentEntry: number): void => {
				setCurrentEntry(currentEntry);
			}
		}
	}



	render() {

		const {
			forms,
			templates,
			entryViewerForm,
			entryPage,
			entries,
			currentEntry,
			activeView,
			mainStatus,
			settings
		} = this.state;

		return (
			<Admin.PageBody>
				<TopNav
					mainStatus={mainStatus}
					setActive={activeView => {
						this.setState({activeView});
					}}
					active={activeView}
				/>
				<Grid>
					<Router
						activeView={activeView}
						FormsSection={(
							<FormsSection
								formsStore={this.getFormsStore()}
								formEntryViewerState={this.getFormEntryViewerState()}
								forms={forms}
								template={templates}
								entryViewerForm={entryViewerForm}
								entryPage={entryPage}
								entries={entries}
								currentEntry={currentEntry}
								helpContentCategory={550}
								activeView={activeView}
							/>
						)}
						SettingsSection={(
							<Settings
								settings={settings}
								onSettingsSave={() => {}}
								helpContentCategory={550}
								activeView={activeView}
							/>
						)}
						NewFormSection={(
							<NewForm
								onCreate={this.getFormsStore().createForm}
								templates={templates}
								forms={forms}
							/>
						)}
					/>
				</Grid>
			</Admin.PageBody>
		)
	}
};

export default CalderaAdminWithState;
import React, {Component} from 'react';
import {SlotFillProvider} from '@wordpress/components'
import FormAdminToolbar from "./screens/admin/FormAdminToolbar";
import FormAdminMainView from "./screens/admin/FormAdminMainView";
import FormAdminHelpView from "./screens/admin/FormAdminHelpView";
import CreateFormSlot from "./screens/admin/CreateFormSlot";
import FormsSlot from "./screens/admin/FormsSlot";
import SettingsSlot from "./screens/admin/SettingsSlot";
import EntryViewerSlot from "./screens/admin/EntryViewerSlot";
import GettingStartedSlot from './screens/admin/GettingStartedSlot';
import {collectionTypes} from './types'
import {PRO_CONNECTED, PRO_SETTINGS} from "./components/Settings/ProSettings/proSettingsType";
import statusType from "./components/Layout/statusType";
import PropTypes from "prop-types";
import {store} from '@caldera-labs/state'
import './css/legacy/admin.css';
import './css/admin-two.css';

/**
 * The main container for Caldera Forms admin
 */
class CalderaAdmin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			entryViewerForm: {},
		};
		this.onFormUpdate = this.onFormUpdate.bind(this);
		this.onCreateForm = this.onCreateForm.bind(this);
		this.isProConnected = this.isProConnected.bind(this);
		this.onOpenEntryViewerForForm = this.onOpenEntryViewerForForm.bind(this);
		this.showEntryViewer = this.showEntryViewer.bind(this);
		this.renderIfHasForms = this.renderIfHasForms.bind(this);
	}

	/**
	 * Dispatch form update to parent
	 * @param form
	 */
	onFormUpdate(form) {
		this.props.onFormUpdate(form)
	}

	/**
	 * When entry viewer is opened
	 *
	 * @param {String} formId
	 */
	onOpenEntryViewerForForm(formId) {
		this.setState({
			entryViewerForm: this.props.forms[formId]
		});

		if (this.props.openEntryViewerForForm) {
			this.props.openEntryViewerForForm(formId);
		}
	}

	/**
	 *
	 * @param {String} newForm
	 */
	onCreateForm(newForm) {
		this.props.onCreateForm(newForm)
	}

	/**
	 * Check if Caldera FormsSlot Pro is connected or not
	 * @return {*|boolean}
	 */
	isProConnected() {
		return this.props.settings[PRO_SETTINGS][PRO_CONNECTED];
	}

	/**
	 * Check if entry viewe should show
	 * @return {boolean}
	 */
	showEntryViewer() {
		const {entryViewerForm} = this.state;
		return 0 !== Object.keys(entryViewerForm).length && entryViewerForm.hasOwnProperty('fields')

	}

	/**
	 * @inheritDoc
	 */
	render() {
		if( this.props.loading ){
			return (
				<span>Loading</span>
			)
		}

		if( 'object' !== typeof this.props.forms || 0 < Object.keys( this.props.forms ).length ){
			return this.renderIfHasForms();

		}

		const {
			mainStatus,
			updateSettings,
			templates,
			forms,
			settings
		} = this.props;

		return (
			<React.Fragment>
				<SlotFillProvider>
					<FormAdminToolbar
						isProConnected={this.isProConnected()}
						mainStatus={mainStatus}
					/>
					<CreateFormSlot
						forms={forms}
						onCreateForm={this.onCreateForm}
						templates={templates}
					/>
					<SettingsSlot
						forms={forms}
						settings={settings}
						updateSeqttings={updateSettings}
						helpContentCategory={548}
					/>
					<GettingStartedSlot
						helpContentCategory={550}

					/>

				</SlotFillProvider>

			</React.Fragment>
		)


	}

	renderIfHasForms() {
		const {
			forms,
			mainStatus,
			settings,
			updateSettings,
			entries,
			templates
		} = this.props;
		return (
			<React.Fragment>
				<SlotFillProvider>
					<FormAdminToolbar
						isProConnected={this.isProConnected()}
						mainStatus={mainStatus}
					/>
					<FormsSlot
						forms={forms}
						onFormUpdate={this.onFormUpdate}
						openEntryViewerForForm={this.onOpenEntryViewerForForm}
						helpContentCategory={549}
					/>
					<CreateFormSlot
						forms={forms}
						onCreateForm={this.onCreateForm}
						templates={templates}
					/>
					<SettingsSlot
						forms={forms}
						settings={settings}
						updateSeqttings={updateSettings}
						helpContentCategory={548}
					/>
					{this.showEntryViewer() &&
					<EntryViewerSlot
						form={this.state.entryViewerForm}
						entries={entries}
						helpContentCategory={551}
						onEntryPageNav={this.props.onEntryPageNav}
					/>
					}
					<FormAdminMainView/>
					<FormAdminHelpView/>

				</SlotFillProvider>
			</React.Fragment>
		);
	}
}

const {formsType, entriesType, settingsType} = collectionTypes;
const {actions,selectors} = store;

/**
 * Prop types for  CalderaAdmin component
 * @type {{forms: shim, entries: shim, settings, mainStatus, updateSettings: shim, updateForms: shim, createFrom: shim}}
 */
CalderaAdmin.propTypes = {
	...{
		forms: formsType,
		entries: entriesType,
		settings: settingsType,
		mainStatus: statusType,
	},
	loading: PropTypes.bool,
	openEntryViewerForForm: PropTypes.func,
	onEntryPageNav: PropTypes.func,
	onCreateForm: PropTypes.PropTypes.func,
	templates: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object
	])
};

Object.keys(actions).forEach( actionKey => {
	CalderaAdmin.propTypes[actionKey] = PropTypes.func;
});
Object.keys(selectors).forEach( selectorKey => {
	CalderaAdmin.propTypes[selectorKey] = PropTypes.func;
});

CalderaAdmin.defaultProps = {
	settings: {
		[PRO_SETTINGS]: {
			[PRO_CONNECTED]: false
		}
	},
	mainStatus: {
		message: '',
		show: false,
		success: false,
		updating: false
	}
};

export default CalderaAdmin
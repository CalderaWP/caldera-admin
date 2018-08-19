import CalderaAdmin from './CalderaAdmin'
import {compose} from '@wordpress/compose';
import {withSelect,withDispatch} from '@wordpress/data';
import {store} from "@caldera-labs/state";
import {CALDERA_FORMS_ADMIN_STORE } from "./store";
import {PRO_SETTINGS} from "./components/Settings/ProSettings/proSettingsType";
import {GENERAL_SETTINGS} from "./components/Settings/GeneralSettings/generalSettingsType";
import {prepareGeneralSettings} from "./components/Settings/GeneralSettings/prepareGeneralSettings";
import {prepareProSettings} from "./components/Settings/ProSettings/prepareProSettings";


/**
 * Create selector functions
 * @param {Object} select
 * @return {{forms: *}}
 */
export const selectors = (select,ownProps) => {
	const {
		getForm,
		getForms,
		getFormPreview,
		getFormPreviews,
		getFormPrivacySettings,
		getStyleIncludes,
		getOtherSettings,
		getCfProFormSetting,
		getCfProSettings,
		getPageOfEntries
	} = select(CALDERA_FORMS_ADMIN_STORE);

	return {
		settings: {
			[GENERAL_SETTINGS]: prepareGeneralSettings(
				getStyleIncludes(),
				getOtherSettings()
			),
			[PRO_SETTINGS]: prepareProSettings(getCfProSettings()),
			privacySettings : {

			}
		},
		forms: ownProps.forms,
		getForm,
		getForms,
		getFormPreview,
		getFormPreviews,
		getCfProFormSetting,
		getPageOfEntries,
		getFormPrivacySettings
	}
};

/**
 * Create dispatch action functions
 * @param dispatch
 */
export const dispatchers = (dispatch) => {
	const {actions} = store;
	let dispatches = {};
	Object.keys(actions).forEach(actionKey => {
		dispatches[actionKey]=actions[actionKey];
	});
	return {dispatches} = dispatch( CALDERA_FORMS_ADMIN_STORE);
};

/**
 * Main admin component wrapped in state
 */
export const CalderaAdminWithState =  compose(
	withSelect((select, ownProps) => {
		console.log(ownProps);
		return selectors(select,ownProps);
	}),
	withDispatch(dispatch => {
		return dispatchers(dispatch);
	})
)(CalderaAdmin);
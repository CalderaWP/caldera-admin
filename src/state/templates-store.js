import {state} from '@caldera-labs/state/lib/module';
import {cfAdmin} from '../apiClients';

const {CALDERA_FORMS_STORE_SLUG} = state;


/**
 * Selector to get all form templates
 *
 * @param state
 * @return {shim|*|{starter_contact_form, variable_price_example, registration, simple_booking_form_example}}
 */
export const getFormTemplates = (state) => {
	return state.templates;
};

/**
 * Slug for form templates store
 * @type {string}
 */
export const CALDERA_FORMS_TEMPLATE_STORE_SLUG =  `${CALDERA_FORMS_STORE_SLUG}/TEMPLATES`;

/**
 * Name of action indicating that form templates should be set in store
 * @type {string}
 */
export const SET_FORM_TEMPLATES = `${CALDERA_FORMS_TEMPLATE_STORE_SLUG}/SET_FORM_TEMPLATES`;

/**
 * Action to set form templates in store
 * @param {Object} templates
 * @return {{type: string, templates: *}}
 */
export const setFormTemplates = (templates) => {
	return {
		type: SET_FORM_TEMPLATES,
		templates
	};
};


/**
 * Default value for form templates store
 */
export const DEFAULT_TEMPLATES  = cfAdmin.templates;


/**
 * Reducer for form templates
 *
 * @param {Object} state
 * @param {Object} action
 * @return {*}
 */
export const formTemplateReducer = ( state = DEFAULT_TEMPLATES, action ) => {
	switch( action.type ){
	case SET_FORM_TEMPLATES:
		return {
			...state,
			templates: action.templates
		};
	default:
		if( undefined === state ){
			return {};
		}
		return state;
	}
};

export default {
	formTemplateReducer,
	DEFAULT_TEMPLATES,
	actions: setFormTemplates,
	selectors: getFormTemplates
};
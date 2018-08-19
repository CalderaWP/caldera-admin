import * as CalderaState  from '@caldera-labs/state';
import {
	CALDERA_FORMS_TEMPLATE_STORE_SLUG,
	formTemplateReducer
} from "./state/templates-store";
import {registerStore,combineReducers} from '@wordpress/data';
const {reducers} = CalderaState.state;

/**
 * Collection of all admin reducers
 * @type {{}}
 */
const adminReducers = {
	[CALDERA_FORMS_TEMPLATE_STORE_SLUG]: formTemplateReducer
};


Object.keys(reducers).forEach(reducerKey => {
	adminReducers[reducerKey] = reducers[reducerKey]
});
/**
 * Identifier for Caldera Forms store
 * @type {string}
 */
export const CALDERA_FORMS_ADMIN_STORE = 'CALDERA_FORMS_ADMIN_STORE';

const {actions,selectors} = CalderaState.store;

/**
 * Main Redux(-like) store for Caldera Forms Admin
 */
const  store = registerStore(
	CALDERA_FORMS_ADMIN_STORE,
	{
		reducer: combineReducers(adminReducers),
		actions,
		selectors
	}
);

export default store;

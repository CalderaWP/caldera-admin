/*global CF_ADMIN*/
/*eslint no-undef: "error"*/
import {wpClientFactory} from '@caldera-labs/api-client';

/**
 * Caldera Forms admin configuration data
 *
 * @type {{rest: {nonce: *, root: string}, templates: *}}
 */
export const cfAdmin = {
	rest: {
		nonce: 'object' === typeof  CF_ADMIN  ? CF_ADMIN.rest.nonce: 'theNonce',
		root: 'object' === typeof  CF_ADMIN  ? CF_ADMIN.rest.root:'./__MOCK_DATA__/cf-api'
	},
	templates: 'object' === typeof  CF_ADMIN  ? CF_ADMIN.templates: {},
	forms: 'object' === typeof  CF_ADMIN  ? JSON.parse(CF_ADMIN.forms): {},
};

/**
 * 1 instance of forms client
 *
 * @type {FormsClient}
 */
export const formsAdminApiClient = wpClientFactory(
	cfAdmin.rest.root,
	cfAdmin.rest.nonce,
	'forms'
);

/**
 * 1 instance of privacy settings client
 *
 * @type {PrivacySettingsClient}
 */
export const privacySettingsClient = wpClientFactory(
	cfAdmin.rest.root,
	cfAdmin.rest.nonce,
	'privacy'
);

/**
 * 1 instance of general settings client
 *
 * @type {GeneralSettingClient}
 */
export const generalSettingsClient = wpClientFactory(
	cfAdmin.rest.root,
	cfAdmin.rest.nonce,
	'settings'
);

/**
 * 1 instance of pro settings client
 *
 * @type {ProLocalSettingClient}
 */
export const proSettingsClient = wpClientFactory(
	cfAdmin.rest.root,
	cfAdmin.rest.nonce,
	'proLocal'
);




/**
 * 1 instance of general settings client
 *
 * @type {EntriesClient}
 */
export const entriesClient = wpClientFactory(
	cfAdmin.rest.root,
	cfAdmin.rest.nonce,
	'entries'
);

/**
 *
 */
export default {
	cfAdmin,
	formsAdminApiClient,
	entriesClient,
	proSettingsClient,
	privacySettingsClient,
	generalSettingsClient,
}
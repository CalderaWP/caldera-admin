import apiClients from '../apiClients';

const {
	formsAdminApiClient,
	PrivacySettingsClient,
	GeneralSettingClient,
	ProLocalSettingClient,
	entriesClient
} = apiClients;

/**
 * All @wordpress/data resolvers for this app
 * 
 * @type {{getForm: (function(*=): *), getForms: (function(*=): *), getFormPreview: (function(*=): *), getFormPrivacySettings: (function(*=): MediaTrackSettings), getStyleIncludes: (function(): ({grid: boolean, form: boolean, alert: boolean}|settings.styleIncludes|{grid, form, alert})), getOtherSettings: (function(): function(): ({cdnEnable: boolean}|settings.otherSettings|{cdnEnable})), getCfProFormSetting(): *, getCfProSettings: (function(): MediaTrackSettings), getPageOfEntries: (function(*=): *)}}
 */
export const resolvers = {
	getForm: (formId) => formsAdminApiClient.getForm(formId),
	getForms: (page = 1) => formsAdminApiClient.getForms(page),
	getFormPreview: (formId) => formsAdminApiClient.getFormPreview(formId),
	getFormPrivacySettings: (formId) => PrivacySettingsClient.getSettings(formId),
	getStyleIncludes: async () => {
		const settings = await GeneralSettingClient.getSettings();
		return settings.styleIncludes;
	},
	getOtherSettings: () => async () => {
		const settings = await GeneralSettingClient.getSettings();
		return settings.otherSettings;
	},
	getCfProFormSetting() {
		return {};
	},
	getCfProSettings: () => ProLocalSettingClient.getSettings(),
	getPageOfEntries: (page = 1) => entriesClient.getEntries(page),

};
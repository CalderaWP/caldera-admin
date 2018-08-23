// @flow
import {
	proSettingsClient,
	privacySettingsClient,
	generalSettingsClient
} from '../../apiClients';

import type {styleIncludesSettings,proSettings,proApiKeys,otherSettings} from "../types/settings";


export type settingsState = {
	styleIncludes: styleIncludesSettings,
	otherSettings: otherSettings,
	proSettings: ?proSettings
};

/**
 * Current settings state
 *
 * @type {{styleIncludes: {}, otherSettings: {}, proSettings: {}}}
 */
let state : settingsState = {
	styleIncludes: {
		'SETTINGS/STYLE_INCLUDES/FORM': true,
		'SETTINGS/STYLE_INCLUDES/GRID': true,
		'SETTINGS/STYLE_INCLUDES/ALERT': true,
	},
	otherSettings: {
		'SETTINGS/CDN': false,
	},
	proSettings: null
};

/**
 * API for get/set settings
 * @type {{getStyleIncludes: (function(): styleIncludesSettings), setStyleIncludes: (function(styleIncludesSettings): Promise), getOtherSettings: (function(): otherSettings), setOtherSettings: (function(*): Promise), getProSettings: (function(): proSettings), setProSettings: (function(): proSettings)}}
 */
export const settingsStore = {
	getStyleIncludes: () : styleIncludesSettings => {
		return state.styleIncludes;
	},
	setStyleIncludes: (styleIncludes: styleIncludesSettings) : Promise<any> => {
		state = {
			...state,
			styleIncludes
		};
		return new Promise((resolve, reject) => {
			generalSettingsClient.updateSettings(
				state.styleIncludes,
				state.otherSettings
			).then( r => {
				console.log(r);

			}).catch(error => {
				resolve(error)
			});
		});
	},
	getOtherSettings: () : otherSettings => {
		return state.otherSettings;
	},
	setOtherSettings: (otherSettings : otherSettings ) : Promise<any> => {
		state = {
			...state,
			otherSettings
		};

		return new Promise((resolve, reject) => {
			generalSettingsClient.updateSettings(
				state.styleIncludes,
				state.otherSettings
			).then( r  => {
				console.log(r);
			}).catch(error => {
				resolve(error)
			});
		});
	},
	getProSettings: () : ?proSettings => {
		return state.proSettings ? state.proSettings : null;
	},
	setProSettings: (proSettings : proSettings)  => {
		 state = {
			 ...state,
			 proSettings
		 }
	},

};
import {settingsProp} from "../../../state/prepareSettings";
import configFields, {
	ENHANCED_DELIVERY,
	LOG_LEVEL,
	PRIVATE_KEY,
	PRO_API_KEYS,
	PRO_GENERAL_SETTINGS,
	PUBLIC_KEY
} from './configFields';
import {PRO_CONNECTED} from './proSettingsType'
import merge from 'deepmerge'

export const prepareProSettings = (settings = {}) => {
	const settingsBasic = {
			[PRO_CONNECTED]: false,
			[PRO_API_KEYS]: {},
			[PRO_GENERAL_SETTINGS]: {}
		};
	if( undefined !== typeof  settings ) {
		settings = merge(
			settingsBasic,
			settings
		);

	}else{
		settings = settingsBasic;
	}


	return {
		[PRO_CONNECTED]: settingsProp(settings, PRO_CONNECTED, false ),
		[PRO_API_KEYS]: {
			[PUBLIC_KEY]: settingsProp(
				settings[PRO_API_KEYS],
				PUBLIC_KEY,
				configFields[PRO_API_KEYS].find( field => PUBLIC_KEY === field.id).default
			),
			[PRIVATE_KEY]: settingsProp(
				settings[PRO_API_KEYS],
				PRIVATE_KEY,
				configFields[PRO_API_KEYS].find( field => PRIVATE_KEY === field.id).default
			),
		},
		[PRO_GENERAL_SETTINGS]: {
			[ENHANCED_DELIVERY]: settingsProp(
				settings[PRO_GENERAL_SETTINGS],
				ENHANCED_DELIVERY,
				configFields[PRO_GENERAL_SETTINGS].find( field => ENHANCED_DELIVERY === field.id).default
			),
			[LOG_LEVEL]: settingsProp(
				settings[PRO_GENERAL_SETTINGS],
				LOG_LEVEL,
				configFields[PRO_GENERAL_SETTINGS].find( field => LOG_LEVEL === field.id).default
			),
		},
		forms: settingsProp(settings,'forms',{})
	};



};

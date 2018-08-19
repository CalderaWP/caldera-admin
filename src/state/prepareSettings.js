import {GENERAL_SETTINGS} from '../components/Settings/GeneralSettings/generalSettingsType';
import {PRO_SETTINGS} from '../components/Settings/ProSettings/proSettingsType';
import {prepareProSettings} from '../components/Settings/ProSettings/prepareProSettings';
import {prepareGeneralSettings} from '../components/Settings/GeneralSettings/prepareGeneralSettings';

/**
 * Get a property from settings object
 *
 * @param {Object} settings Settings to search in
 * @param {String} prop Name of enumerable key in object to find
 * @param {String|Number|Array} defaultValue Fallback value
 * @return {String|Number|Array}
 */
export const settingsProp = (settings,prop,defaultValue) =>{
	return settings.hasOwnProperty(prop) ? settings[prop] : defaultValue;
};

/**
 * Prepare Caldera Forms settings
 * @param {Object} settings Settings to prepare
 *
 * @return {{privacySettings: {}, [p: string]: {}}}
 */
export const prepareSettings = (settings) => {
	return {
		[GENERAL_SETTINGS]: prepareGeneralSettings(
			settingsProp(settings,'styleIncludes',{}),
			settingsProp(settings,'otherSettings',{}),
		),
		[PRO_SETTINGS]: prepareProSettings(
			settingsProp(settings,PRO_SETTINGS,{})
		),
		privacySettings : {

		}
	};

};
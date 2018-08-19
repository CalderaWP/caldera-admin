import {CDN_ENABLE, STYLE_ALERT, STYLE_FORM, STYLE_GRID} from "./configFields";
import {settingsProp} from "../../../state/prepareSettings";

/**
 * Prepare general Caldera (Forms) settings
 * @param styleIncludes
 * @param otherSettings
 * @return {{[p: string]: *}}
 */
export const prepareGeneralSettings = (styleIncludes,otherSettings = {}) => {
	return {
		[STYLE_FORM] : settingsProp(
			styleIncludes,STYLE_FORM,true,
		),
		[STYLE_GRID] : settingsProp(
			styleIncludes,STYLE_GRID,true,
		),
		[STYLE_ALERT] : settingsProp(
			styleIncludes,STYLE_ALERT,true,
		),
		[CDN_ENABLE] : settingsProp(
			otherSettings,CDN_ENABLE,true,
		),

	}


};
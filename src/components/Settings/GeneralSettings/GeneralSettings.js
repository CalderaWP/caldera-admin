import PropTypes from 'prop-types';
import configFields, {CDN_ENABLE, STYLE_ALERT, STYLE_FORM, STYLE_GRID} from './configFields'
import {SettingsGroup} from "../SettingsGroup";
import types from "../../../types";



/**
 * Create the global form settings UI
 * @param {Object} props
 * @return {*}
 * @constructor
 */
export class GeneralSettings extends SettingsGroup {

};

/**
 * Prop types for the GlobalForms settings component
 * @type {{}}
 */
GeneralSettings.propTypes = {
	configFields: PropTypes.array,
	classNames: PropTypes.string,
	settings: types.generalSettingsType,
	onSettingsChange: PropTypes.func.isRequired
};
/**
 * Class names used in the GlobalForms settings component
 * @type {{wrapper: string}}
 */
GeneralSettings.classNames = {
	wrapper: 'caldera-forms-global-form-settings'
};

/**
 * Default props for the GlobalForms settings component
 * @type {{}}
 */
GeneralSettings.defaultProps = {
	configFields,
	settings: {
		[STYLE_FORM]: true,
		[STYLE_ALERT]: true,
		[STYLE_GRID]: true,
		[CDN_ENABLE]: false
	}
};




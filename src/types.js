import formType from './components/EntryViewer/formType';
import entryType from './components/EntryViewer/entryType';
import proSettingsType, {PRO_SETTINGS} from './components/Settings/ProSettings/proSettingsType';
import statusType from './components/Layout/statusType';
import privacySettingsType from './components/Settings/PrivacySettings/privacySettingsType';
import generalSettingsType, {GENERAL_SETTINGS} from './components/Settings/GeneralSettings/generalSettingsType';

import PropTypes from 'prop-types';

/**
 * Prop types for collections of data types
 *
 * @type {{formsType: shim, entriesType: shim, proSettingsType: shim}}
 */
export const collectionTypes = {
	formsType: PropTypes.object,
	entriesType: PropTypes.object,
	settingsType: PropTypes.shape({
		[PRO_SETTINGS]: PropTypes.object,
		[GENERAL_SETTINGS]: PropTypes.object,
		privacySettings: PropTypes.object
	})

};

/**
 * Prop types for singular data types.
 */
export default {
	formType,
	entryType,
	proSettingsType,
	generalSettingsType,
	privacySettingsType,
	statusType
}

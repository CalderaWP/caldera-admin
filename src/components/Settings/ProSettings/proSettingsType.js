import {
	ENHANCED_DELIVERY,
	LOG_LEVEL,
	PRIVATE_KEY,
	PRO_API_KEYS,
	PRO_GENERAL_SETTINGS,
	PUBLIC_KEY
} from "./configFields";
import PropTypes from 'prop-types'
import {pickArray} from "../../util/pickArray";
import configFields from './configFields';
export const PRO_CONNECTED = 'connected';
export const PRO_SETTINGS = 'proSettings';


export default {
	[PRO_CONNECTED]: PropTypes.bool,
	[PRO_API_KEYS]: PropTypes.shape(
		{
			[PUBLIC_KEY]: PropTypes.string,
			[PRIVATE_KEY]: PropTypes.string,
		}
	),
	[PRO_GENERAL_SETTINGS]: PropTypes.shape(
		{
			[ENHANCED_DELIVERY]: PropTypes.bool,
			[LOG_LEVEL]: pickArray(
				configFields[PRO_GENERAL_SETTINGS].find(setting => LOG_LEVEL === setting.id ).options,
				'value'
			)
		}
	),
	formSettings: PropTypes.object
};
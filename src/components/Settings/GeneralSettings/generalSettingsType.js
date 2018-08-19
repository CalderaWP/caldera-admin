import {
	STYLE_GRID,
	STYLE_ALERT,
	STYLE_FORM,
	CDN_ENABLE
} from "./configFields";

import PropTypes from 'prop-types';

export const GENERAL_SETTINGS = 'generalSettings';
export default PropTypes.shape({
	[STYLE_GRID]: PropTypes.bool,
	[STYLE_ALERT]: PropTypes.bool,
	[STYLE_FORM]: PropTypes.bool,
	[CDN_ENABLE]: PropTypes.bool,

});
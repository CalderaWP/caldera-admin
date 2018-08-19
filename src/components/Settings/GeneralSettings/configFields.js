import {optionFactory} from "../../util/optionFactory";

export const STYLE_FORM = 'SETTINGS/STYLE_INCLUDES/FORM';
export const STYLE_GRID = 'SETTINGS/STYLE_INCLUDES/FORM';
export const STYLE_ALERT = 'SETTINGS/STYLE_INCLUDES/STYLE_ALERT';
export const CDN_ENABLE = 'SETTINGS/CDN';
const enableOption = optionFactory(
	true,
	'Enable'
);
export default  [
	{
		id: STYLE_FORM,
		label: 'Form Styles',
		desc: 'Includes Bootstrap 3 styles on the frontend for form fields and buttons',
		type: 'checkbox',
		path: 'styleIncludes.form',
		options: [enableOption]
	},
	{
		id: STYLE_ALERT,
		label: 'Alert Styles',
		desc: 'Includes Bootstrap 3 styles on the frontend for form alert notices',
		type: 'checkbox',
		path: 'styleIncludes.alert',
		options: [enableOption]
	},
	{
		id: STYLE_GRID,
		label: 'Grid',
		desc: 'Includes Bootstrap 3 styles on the frontend for form grid layouts',
		type: 'checkbox',
		path: 'styleIncludes.grid',
		options: [enableOption]
	},{
		id: CDN_ENABLE,
		label: 'Enable Free CDN',
		desc: 'Some usage data will be shared with CDN providers',
		type: 'checkbox',
		path: 'otherSettings.cdnEnable',
		options: [enableOption]
	},

]
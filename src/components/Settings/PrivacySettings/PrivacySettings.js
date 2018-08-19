import React from 'React';
import propTypes from 'prop-types';
import classNames from 'classnames'

/**
 * Create the global form settings UI
 * @param {Object} props
 * @return {*}
 * @constructor
 */
export const PrivacySettings = (props) => {
	return(
		<div
			className={classNames(props.className,PrivacySettings.classNames.wrapper)}
		>
			PrivacySettings
		</div>
	)
};

/**
 * Prop types for the GlobalForms settings component
 * @type {{}}
 */
PrivacySettings.propTypes = {
	classNames: propTypes.string
};

/**
 * Default props for the GlobalForms settings component
 * @type {{}}
 */
PrivacySettings.defaultProps = {

}

/**
 * Class names used in the GlobalForms settings component
 * @type {{wrapper: string}}
 */
PrivacySettings.classNames = {
	wrapper: 'caldera-forms-global-form-settings'
}
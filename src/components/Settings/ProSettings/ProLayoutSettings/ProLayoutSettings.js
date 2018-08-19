import React from 'React';
import propTypes from 'prop-types';
import classNames from 'classnames'

/**
 * Create the global form settings UI
 * @param {Object} props
 * @return {*}
 * @constructor
 */
export const ProLayoutSettings = (props) => {
	return(
		<div
			className={classNames(props.className,ProLayoutSettings.classNames.wrapper)}
		>
			ProLayoutSettings
		</div>
	)
};

/**
 * Prop types for the GlobalForms settings component
 * @type {{}}
 */
ProLayoutSettings.propTypes = {
	classNames: propTypes.string
};

/**
 * Default props for the GlobalForms settings component
 * @type {{}}
 */
ProLayoutSettings.defaultProps = {

}

/**
 * Class names used in the GlobalForms settings component
 * @type {{wrapper: string}}
 */
ProLayoutSettings.classNames = {
	wrapper: 'caldera-forms-global-form-settings'
}
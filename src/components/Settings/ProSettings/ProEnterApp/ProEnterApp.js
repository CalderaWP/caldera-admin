import React from 'React';
import propTypes from 'prop-types';
import classNames from 'classnames'

/**
 * Create the global form settings UI
 * @param {Object} props
 * @return {*}
 * @constructor
 */
export const ProEnterApp = (props) => {
	return(
		<div
			className={classNames(props.className,ProEnterApp.classNames.wrapper)}
		>
			ProEnterApp
		</div>
	)
};

/**
 * Prop types for the GlobalForms settings component
 * @type {{}}
 */
ProEnterApp.propTypes = {
	classNames: propTypes.string
};

/**
 * Default props for the GlobalForms settings component
 * @type {{}}
 */
ProEnterApp.defaultProps = {

}

/**
 * Class names used in the GlobalForms settings component
 * @type {{wrapper: string}}
 */
ProEnterApp.classNames = {
	wrapper: 'caldera-forms-global-form-settings'
}
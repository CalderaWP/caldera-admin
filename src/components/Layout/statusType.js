import PropTypes from "prop-types";
export const statusShape = {
	message: PropTypes.string,
	show: PropTypes.bool,
	success: PropTypes.bool,
	updating: PropTypes.bool
};
/**
 * Prop types for Status component that shows message and/or spinner
 */
export default PropTypes.shape(statusShape);
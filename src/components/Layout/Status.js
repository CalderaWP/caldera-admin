import React from 'react';
import {Spinner} from '@wordpress/components';
import {Admin} from '@caldera-labs/components'
import {statusShape} from "./statusType";

export const Status = (props) => {
	if (props.updating) {
		return (
			<Spinner/>
		)
	}
	return (
		<Admin.StatusIndicator
			message={props.message}
			show={props.show}
			success={props.success}
		/>
	)
};

Status.propTypes = statusShape;

Status.defaultProps = {
	show: false,
	success: true,
};



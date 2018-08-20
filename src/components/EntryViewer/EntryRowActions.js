import React from "react";
import PropTypes from 'prop-types';
import {Button} from '@wordpress/components'

export const EntryRowActions = (props) => {

		return(
			<div>
				<Button
					className={EntryRowActions.classNames.view}
					isDefault
					isLarge
					onClick={() => {
						props.onView()
					}}
				>
					View
				</Button>
				<Button
					className={EntryRowActions.classNames.delete}
					isDefault
					isLarge
					onClick={() => {
						props.onEntryAction('delete');
					}}

				>
					Delete
				</Button>
				<Button
					className={EntryRowActions.classNames.resend}
					isDefault
					isLarge
					onClick={() => {
						props.onEntryAction('resend');
					}}

				>
					Resend
				</Button>
			</div>
		)





};

EntryRowActions.propTypes = {
	onEntryAction: PropTypes.func,

};

EntryRowActions.classNames = {
	view: 'entry-view-action-view',
	delete: 'entry-view-action-delete',
	resend: 'entry-view-action-resend',
};




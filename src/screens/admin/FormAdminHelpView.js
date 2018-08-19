import React from 'react';
import {createSlotFill} from '@wordpress/components'

const {Fill, Slot} = createSlotFill('FormAdminHelpView');

/**
 * Renders the help section with docs/ product links around main admin screen content
 */
export default class FormAdminHelpView extends React.Component {
	static Content = (props) => (
		<Fill name="FormAdminHelpView.Content">
			<div>{props.children}</div>
		</Fill>
	);

	render() {
		return (
			<div className={'caldera-admin-help-content'}>
				<Slot name="FormAdminHelpView.Content">
					{(items) => <div>{items[items.length - 1]}</div>}
				</Slot>
			</div>
		);
	}
}

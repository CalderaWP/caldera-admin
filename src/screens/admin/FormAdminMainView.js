import React from 'react';
import {createSlotFill} from '@wordpress/components'

const {Fill, Slot} = createSlotFill('FormAdminMainView');

/**
 * Renders the main view for the admin screen.
 */
export default class FormAdminMainView extends React.Component {
	static Content = (props) => (
		<Fill name="FormAdminMainView.Content">
			<div>{props.children}</div>
		</Fill>
	);

	render() {
		return (
			<main>
				<Slot name="FormAdminMainView.Content">
					{(items) => <div>{items[items.length - 1]}</div>}
				</Slot>
			</main>
		);
	}
}

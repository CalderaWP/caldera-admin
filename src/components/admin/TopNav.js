// @flow
import React from 'react';
import type {statusType} from "../../types/types/statusType";
import {
	Spinner,
	Button
} from '@wordpress/components'
import {Admin} from '@caldera-labs/components'


export const TopNav = (props: {
	setActive: Function,
	active: string,
	mainStatus: statusType
}) => {

	function onClick(newActive: string) {
		props.setActive(newActive)
	};


	return (
		<React.Fragment>
			<Admin.CalderaHeader>
				<li>
					<Button
						isPrimary
						onClick={() => {
							onClick('newForm')
						}}
					>
						New Form
					</Button>
				</li>
				<li>
					<Button
						onClick={() => {
							onClick('forms')
						}}
					>
						Forms
					</Button>
				</li>
				<li>
					<Button
						onClick={() => {
							onClick('settings')
						}}
					>
						Settings
					</Button>
				</li>
				{props.mainStatus.loading &&
					<li>
						<Spinner/>
					</li>
				}
				{props.mainStatus.show &&
					<li>
						<Admin.StatusIndicator
							message={props.mainStatus.message}
							show={props.mainStatus.show}
							success={props.mainStatus.success}
						/>
					</li>
				}
			</Admin.CalderaHeader>


		</React.Fragment>
	)
}
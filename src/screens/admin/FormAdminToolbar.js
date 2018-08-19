import React from 'react';
import {Component} from '@wordpress/element';
import {createSlotFill, Button} from '@wordpress/components'
import {Admin} from '@caldera-labs/components'
import {Status} from "../../components/Layout/Status";
import PropTypes from 'prop-types'
import types from '../../types'
const {Fill, Slot} = createSlotFill('FormAdminToolbar');

class FormAdminToolbar extends Component {

	static NavBar = ({label, onActive, onDeactive, isActive = false}) => (
		<Fill
			name="FormAdminToolbar.NavBar"
			label={label}
			onActive={onActive}
			onDeactive={onDeactive}
		>
			<li>
				<Button
					isPrimary
					onClick={() => {
						if (isActive) {
							onDeactive();
						} else {
							onActive()
						}

					}}
				>
					{label}
				</Button>
			</li>
		</Fill>
	);




	constructor(props) {
		super(props);
		this.state = {currentItem: null};
		this.handleClick = this.handleClick.bind(this);
		this.proStatusMessage = this.proStatusMessage.bind(this);
	}

	handleClick({props}) {
		if (this.state.currentItem) {
			this.state.currentItem.onDeactive();
		}

		props.onActive();
		this.setState({currentItem: props});
	}

	proStatusMessage(){
		return this.props.isProConnected ? 'Connected' : 'Not Connected';
	}

	render() {
		const {mainStatus} = this.props;
		return (
			<div>
				<Admin.CalderaHeader>
					<Slot
						name="FormAdminToolbar.NavBar"
						fillChildProps={{onClick: this.handleClick}}
					/>
					<li>
						<Status
							className={FormAdminToolbar.classNames.mainStatus}
							message={mainStatus.message}
							success={mainStatus.success}
							show={mainStatus.show}
							updating={mainStatus.updating}
						/>
					</li>
					<li>
						<Status
							className={FormAdminToolbar.classNames.proStatus}
							message={this.proStatusMessage()}
							success={this.props.isProConnected}
							show={this.showProStatus}
						/>
					</li>
				</Admin.CalderaHeader>


			</div>
		);
	}
}

export default FormAdminToolbar;


FormAdminToolbar.propTypes = {
	isProConnected: PropTypes.bool,
	showProStatus: PropTypes.bool,
	mainStatus: types.statusType,
};

FormAdminToolbar.defaultProps = {
	isProConnected: false,
	showProStatus: true,
};

FormAdminToolbar.classNames = {
	proStatus: 'cf-pro-status',
	mainStatus : 'cf-status'
}

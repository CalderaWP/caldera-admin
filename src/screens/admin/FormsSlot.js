import React from 'react';
import FormAdminToolbar from './FormAdminToolbar';
import FormAdminMainView from './FormAdminMainView';
import FormAdminHelpView from './FormAdminHelpView';
import AdminSlot from "./AdminSlot";
import {FormList} from "../../components/FormsList/FormList";
import {Notice} from '@wordpress/components'

export default class FormsSlot extends AdminSlot {



	getContent(forms) {
		if (0 !== Object.keys(forms).length) {
			return (
				<div>
					<FormList
						forms={forms}
						onFormUpdate={this.props.onFormUpdate}
						openEntryViewerForForm={this.props.openEntryViewerForForm}
					/>
				</div>
			);
		}
		return (
			<Notice
				status="error"
				isDismissible
			>
				No Forms Found
			</Notice>
		);
	}

	render() {
		const {forms} = this.props;
		return (
			<div>
				<FormAdminToolbar.NavBar
					label="Forms"
					onActive={this.handleActive}
					onDeactive={this.handleDeactive}
					isActive={this.state.active}
				/>
				{this.state.active &&
				<React.Fragment>
					<FormAdminMainView.Content>
						{this.getContent(forms)}
					</FormAdminMainView.Content>
					<FormAdminHelpView.Content>
						{this.displayHelpContent()}
					</FormAdminHelpView.Content>
				</React.Fragment>
				}

			</div>
		);
	}


}


FormsSlot.propTypes = FormList.propTypes;
FormsSlot.defaultProps = {
	forms: {},
	entries: {}
};
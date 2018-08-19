import React from 'react';
import FormAdminToolbar from './FormAdminToolbar';
import FormAdminMainView from './FormAdminMainView';
import AdminSlot from "./AdminSlot";
import {NewForm} from "../../components/NewForm/NewForm";
import {collectionTypes} from "../../types";
import PropTypes from 'prop-types';

/**
 * The slot for creating forms
 */
export default class CreateFormSlot extends AdminSlot {

	render() {
		const {forms,onCreateForm,templates} = this.props;
		return (
			<div>
				<FormAdminToolbar.NavBar
					label="New Form"
					onActive={this.handleActive}
					onDeactive={this.handleDeactive}
					isActive={this.state.active}
				/>
				{this.state.active &&
				<div>

					<FormAdminMainView.Content>
						<NewForm
							onCreate={onCreateForm}
							forms={forms}
							templates={templates}
						/>
					</FormAdminMainView.Content>

				</div>
				}
			</div>
		);
	}


}


CreateFormSlot.propTypes = {
	forms: collectionTypes.formsType,
	onCreateForm: PropTypes.func.isRequired,
	templates: PropTypes.oneOfType(
		[
			PropTypes.object,
			PropTypes.array,
		]
	)
};
CreateFormSlot.defaultProps = {
	forms: {},
};
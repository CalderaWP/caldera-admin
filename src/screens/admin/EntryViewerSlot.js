import React from 'react';
import FormAdminToolbar from './FormAdminToolbar';
import FormAdminMainView from './FormAdminMainView';
import AdminSlot from "./AdminSlot";
import types from "../../types";
import PropTypes from 'prop-types';
import {FormEntryViewer} from "../../components/EntryViewer/FormEntryViewer";
import FormAdminHelpView from './FormAdminHelpView';

export default class EntryViewerSlot extends AdminSlot {

	render() {
		const {form,entries,onEntryPageNav} = this.props;

		return (
			<div>
				<FormAdminToolbar.NavBar
					label="Entry Viewer"
					onActive={this.handleActive}
					onDeactive={this.handleDeactive}
					isActive={this.state.active}
				/>
				{this.state.active &&
				<React.Fragment>

					<FormAdminMainView.Content>
						<FormEntryViewer
							form={form}
							entries={entries}
							onPageNav={onEntryPageNav}
						/>
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

/**
 * Prop tyeps for CreateFormSlot component
 * @type {{form: shim, entries: shim}}
 */
EntryViewerSlot.propTypes = {
	form: PropTypes.shape(types.formType),
	entries: PropTypes.shape(types.entriesType),
	onEntryPageNav: PropTypes.func
};

EntryViewerSlot.props = {
	form : {
		ID: '',
		name: ''
	},
	field_details: {
		order: {},
		entry_list: {}
	}
}

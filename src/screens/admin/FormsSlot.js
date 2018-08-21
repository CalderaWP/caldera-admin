import React from 'react';
import FormAdminToolbar from './FormAdminToolbar';
import FormAdminMainView from './FormAdminMainView';
import FormAdminHelpView from './FormAdminHelpView';
import AdminSlot from "./AdminSlot";
import {FormList} from "../../components/FormsList/FormList";
import {Notice} from '@wordpress/components'
import types from "../../types";
import PropTypes from "prop-types";
import {FormEntryViewer} from '../../components/EntryViewer/FormEntryViewer'
import Grid from 'react-css-grid'

export default class FormsSlot extends AdminSlot {


	constructor(props) {
		super(props);
		this.state = {
			showFormList: true
		};
		this.getContent = this.getContent.bind(this);
	}

	getContent(forms) {
		if (0 !== Object.keys(forms).length) {
			const {entryViewerForm, entries, onEntryPageNav} = this.props;

			return (

				<Grid
				>
					{true === this.state.showFormList &&
					<FormList
						forms={forms}
						onFormUpdate={this.props.onFormUpdate}
						openEntryViewerForForm={this.props.openEntryViewerForForm}
					/>

					}

					{'object' === typeof entryViewerForm &&
					<FormEntryViewer
						form={entryViewerForm}
						entries={entries}
						onPageNav={onEntryPageNav}
						// eslint-disable-next-line
						onSingleEntryViewerOpen={() => {
							this.setState({
								showFormList: false
							})
						}
						}
						// eslint-disable-next-line
						onSingleEntryViewerClose={() => {
							this.setState({
								showFormList: true
							})

						}
						}
					/>
					}

				</Grid>
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


FormsSlot.propTypes = {
	...FormList.propTypes,
	entries: PropTypes.shape(types.entriesType),
	onEntryPageNav: PropTypes.func,
	openEntryViewerForForm: PropTypes.func,
	/**entryViewerForm: PropTypes.oneOf([
	 //PropTypes.shape(types.formType),
	 PropTypes.object,
	 PropTypes.bool
	 ]
	 )**/
};

FormsSlot.defaultProps = {
	entryViewerForm: false
};
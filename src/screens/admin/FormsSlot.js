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
import Grid from 'react-css-grid';
import {FormListSort} from '../../components/FormsList/FormListSort'
import {SORT_FORMS_BY_UPDATE,SORT_FORMS_BY_NAME} from "../../components/FormsList/FormListSort";
import {sortFormsBy} from "../../components/FormsList/sortFormsBy";
const filter = require('lodash.filter');

export default class FormsSlot extends AdminSlot {


	constructor(props) {
		super(props);
		this.state = {
			showFormList: true,
			formOrderBy: SORT_FORMS_BY_NAME,
			orderedForms: props.forms,
			formSearchTerm: ''
		};
		this.getContent = this.getContent.bind(this);
		this.onChangeFormOrder = this.onChangeFormOrder.bind(this);
		this.onFormSearch = this.onFormSearch.bind(this);
	}

	/**
	 * When form order changes, resort forms
	 * @param formOrderBy
	 */
	onChangeFormOrder(formOrderBy){
		this.setState({
			formOrderBy,
			orderedForms:sortFormsBy(formOrderBy,this.props.forms)
		});

	}

	/**
	 * Handle form searches
	 *
	 * @param formSearchTerm
	 */
	onFormSearch(formSearchTerm){
		const orderedForms = filter( this.state.orderedForms, (form) => {
			return form.name.includes(formSearchTerm);
		} );

		this.setState({
			formSearchTerm,
			orderedForms

		});

	}

	getContent(forms) {
		if (0 !== Object.keys(forms).length) {
			const {entryViewerForm, entries, onEntryPageNav,openEntryViewerForForm,onFormUpdate} = this.props;
			const {orderedForms, formOrderBy} = this.state;
			return (
				<Grid>
					{true === this.state.showFormList &&
						<div>
							<FormListSort
								order={formOrderBy}
								onChangeOrder={this.onChangeFormOrder}
								onFormSearch={this.onFormSearch}
								formSearchTerm={this.formSearchTerm}
							/>
							<FormList
								forms={orderedForms}
								onFormUpdate={onFormUpdate}
								openEntryViewerForForm={openEntryViewerForForm}
							/>
						</div>

					}

					{'object' === typeof entryViewerForm &&
						<FormEntryViewer
							form={entryViewerForm}
							entries={entries}
							onEntryPageNav={onEntryPageNav}
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
							onEntryListViewClose={() => {
									this.setState({
										showFormList: true
									});
									this.props.openEntryViewerForForm(false)
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
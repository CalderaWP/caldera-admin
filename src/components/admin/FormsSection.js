// @flow
import React from 'react';
import type {calderaAdminProps} from "../../types/calderaAdminProps";
import Grid from 'react-css-grid';
import {sortFormsBy} from "../FormsList/sortFormsBy";
import {FormListSort, SORT_FORMS_BY_NAME} from "../FormsList/FormListSort";
import {FormList} from "../FormsList/FormList";
import {FormEntryViewer} from "../EntryViewer/FormEntryViewer";
import {Notice} from '@wordpress/components'
import type {formState} from "../../types/states/formState";
import type {formEntryViewerState} from "../../types/states/formEntryViewerState";

const filter = require('lodash.filter');


type Props = {
	...formState,
	...formEntryViewerState,
	...calderaAdminProps
};

type State = {
	showFormList: boolean,
	formOrderBy: string,
	orderedForms: Object,
	formSearchTerm: string
};

export class FormsSection extends React.Component<Props, State> {
	state: State = {
		showFormList: true,
		formOrderBy: SORT_FORMS_BY_NAME,
		orderedForms: {},
		formSearchTerm: ''
	};

	/**
	 * Create the section of screen that shows forms and their entries
	 * @param props
	 */
	constructor(props: Props) {
		super(props);
		(this: any).onChangeFormOrder = this.onChangeFormOrder.bind(this);
		(this: any).onFormSearch = this.onFormSearch.bind(this);
		(this: any).getEntryViewerFormConfig = this.getEntryViewerFormConfig.bind(this);
		(this: any).getEntryViewerFormConfig = this.getEntryViewerFormConfig.bind(this);
		(this: any).setEntryViewerForm = this.setEntryViewerForm.bind(this);
		(this: any).onSingleEntryViewerOpen = this.onSingleEntryViewerOpen.bind(this);
		(this: any).onSingleEntryViewerClose = this.onSingleEntryViewerClose.bind(this);
		(this: any).onEntryListViewClose = this.onEntryListViewClose.bind(this);
		(this: any).onEntryPageNav = this.onEntryPageNav.bind(this);

	}

	onEntryPageNav(entryPage:string){
		this.props.formEntryViewerState.setEntryPage(entryPage);
		this.props.formEntryViewerState.getEntriesViaApi();

	}

	setEntryViewerForm(formId: string) {
		this.props.formEntryViewerState.setEntryViewerForm(formId);
		this.props.formEntryViewerState.getEntriesViaApi().then(() => {
			alert(1);
		})
	}

	onSingleEntryViewerOpen(entryId: number) {
		this.props.formEntryViewerState.setCurrentEntry(entryId);
		this.setState({
			showFormList: false
		})

	}

	onSingleEntryViewerClose() {
		this.props.formEntryViewerState.setCurrentEntry(0);
	}

	onEntryListViewClose() {
		this.props.formEntryViewerState.setEntryViewerForm('');
		this.setState({
			showFormList: true
		})
	}


	/**
	 * When form order changes, resort forms
	 * @param formOrderBy
	 */
	onChangeFormOrder(formOrderBy: string) {
		this.setState({
			formOrderBy,
			orderedForms: sortFormsBy(formOrderBy, this.props.forms)
		});

	}

	/**
	 * Handle form searches
	 *
	 * @param formSearchTerm
	 */
	onFormSearch(formSearchTerm: string) {
		if (formSearchTerm) {
			const orderedForms = filter(this.state.orderedForms, (form) => {
				return form.name.includes(formSearchTerm);
			});

			this.setState({
				formSearchTerm,
				orderedForms
			});
		} else {
			this.setState({
				formSearchTerm,
				orderedForms: sortFormsBy(
					this.state.formOrderBy,
					this.props.forms
				)
			});
		}

	}

	getEntryViewerFormConfig(): ?Object {
		const {formsStore, entryViewerForm} = this.props;
		if (entryViewerForm) {
			return formsStore.getForm(entryViewerForm)
		}
		return null;

	}

	/**
	 * Render FormSection component
	 * @return {*}
	 */
	render() {
		const {formsStore, formEntryViewerState} = this.props;
		if (!formsStore.hasForms()) {
			return (
				<Notice
					status="error"
					isDismissible
				>
					No Forms Found
				</Notice>
			)
		}
		const {orderedForms, formOrderBy, formSearchTerm} = this.state;
		const entryViewerFormConfig = this.getEntryViewerFormConfig();
		const {
			setEntryPage,
			getEntries
		} = formEntryViewerState;

		return (
			<Grid>
				{true === this.state.showFormList &&
				<div>
					<FormListSort
						order={formOrderBy}
						onChangeOrder={this.onChangeFormOrder}
						onFormSearch={this.onFormSearch}
						formSearchTerm={formSearchTerm}
					/>
					<FormList
						forms={orderedForms}
						onFormUpdate={formsStore.setForm}
						openEntryViewerForForm={this.setEntryViewerForm}
					/>
				</div>
				}
				{entryViewerFormConfig &&
				<FormEntryViewer
					form={entryViewerFormConfig}
					entries={getEntries()}
					onEntryPageNav={setEntryPage}
					onSingleEntryViewerOpen={this.onSingleEntryViewerOpen}
					onSingleEntryViewerClose={this.onSingleEntryViewerClose}
					onEntryListViewClose={this.onEntryListViewClose}
					// eslint-disable-next-line
					onEntryResend={(entryId) => {
						this.props.formEntryViewerStore.resendEntry(entryId)
					}}
					// eslint-disable-next-line
					onEntryDelete={(entryId) => {
						this.props.formEntryViewerStore.deleteEntry(entryId)
					}}//deleteEntry
				/>

				}
			</Grid>

		)
	}
}

import React from "react";
import PropTypes from 'prop-types';
import {EntryViewer} from "./EntryViewer";
import {Entry} from "./Entry";
import {getFormColumns} from "./getFormColumns";
import getFormRows from "./getFormRows";
import Grid from 'react-css-grid'


/**
 * Encapsulates the UI for viewing the saved entries of a form.
 */
export class FormEntryViewer extends React.PureComponent {

	/**
	 *
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			currentEntry: 0,
		};
		this.setCurrentEntry = this.setCurrentEntry.bind(this);
		this.onEntryAction = this.onEntryAction.bind(this);
		this.getEntryFields = this.getEntryFields.bind(this);
		this.entriesGrid = this.entriesGrid.bind(this);
	}

	/**
	 * Set ID of current entry
	 *
	 * @param {Number} currentEntry
	 */
	setCurrentEntry(currentEntry) {
		this.setState({currentEntry})
	}

	/**
	 * Handle clicks on entry action buttons
	 *
	 * @param {String} eventType Type of event to dispatch
	 * @param {String} id Entry ID
	 */
	onEntryAction(eventType, id) {
		switch (eventType) {
			case 'view':
				this.setCurrentEntry(id);
				break;
			default:
				return;
		}
	}

	getEntryFields(entry) {
		const formFields = this.props.form.fields;

		let fields = [];
		// eslint-disable-next-line
		Object.keys(entry.fields).map(fieldId => {
			let field = entry.fields[fieldId];
			if (formFields.hasOwnProperty(fieldId)) {
				console.log(formFields[fieldId]);
				field.label = formFields[fieldId].name;
			} else {
				field.label = field.slug;

			}
			fields.push(field);
		});
		return fields;
	}

	entriesGrid() {
		return <EntryViewer
			columns={getFormColumns(
				this.props.form,
				true,
				true
			)}
			rows={getFormRows(
				this.props.entries,
				this.onEntryAction
			)}
		/>;
	}

	/**
	 * Render the FormEntryViewer
	 * @return {*}
	 */
	render() {
		const {currentEntry} = this.state;
		const gridCollpase=320;
		const gridGap = 24;

		if (!currentEntry) {
			return (
				<Grid
					width={gridCollpase}
					gap={gridGap}
					className={FormEntryViewer.classNames.wrapper}
				>

					{this.entriesGrid()}
				</Grid>

			)
		}
		if (!this.props.entries.hasOwnProperty(currentEntry)) {
			return <p>Entry {currentEntry} not found</p>
		}

		const entry = this.props.entries[currentEntry];
		let fields = this.getEntryFields(entry);
		return (
			<Grid
				width={gridCollpase}
				gap={gridGap}
				className={FormEntryViewer.classNames.wrapper}
			>
				<Entry
					fields={fields}
					user={entry.user}
					id={entry.id}
					form={this.props.form}
				/>
				{this.entriesGrid()}
			</Grid>
		)

	}



};

/**
 * Default props for the <FormEntryViewer> component
 *
 * @type {{form: *, getEntries: shim}}
 */
FormEntryViewer.propTypes = {
	form: PropTypes.object.isRequired,
	entries: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array,
		]
	)
};

FormEntryViewer.classNames = {
	wrapper: 'caldera-forms-entry-viewer'
}


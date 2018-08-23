// @flow

export type fieldDetail = {
	id: string,
	label: string
}
export type fieldDetails = {
	order: Object,
	entry_list: Object
}

export type mailer = {
	active: boolean
}

export type formEntries = {
	count: ?number
}

/**
 * Type that represents new form options
 */
export type newFormOptions = {
	name: string,
	template: ?string,
	clone: ?string,
};

export type formId = string

export type form = {
	ID: formId,
	name: string,
	fields: Object,
	emailIdentifyingFields: Array<fieldDetails>,
	piiFields: Array<fieldDetails>,
	privacyExporterEnabled: boolean,
	field_details: fieldDetails,
	mailer: mailer,
	entries: ? formEntries
};


export type formEntryUser = {
	name: ?String,
	avatar: ?String,
	email: ?String,
	ID: ?String|number
}
export type formEntryField = {
	slug: String,
	value: String|number|Array<String|number>,
	id: number| String,
	user: formEntryUser,

};

export type formEntryFields = Array<formEntryField>;

export type formEntry = {
	id: String,
	fields: formEntryFields,
	user: formEntryUser,
	
}
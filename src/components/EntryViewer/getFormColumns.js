/**
 * Get column headers for <EntryViewer>
 *
 * @return {({id: string, label: string}|{id: string, label: string})[]}
 */
export function getFormColumns(form, entryListOnly = true, includeEntryActions = true ) {
	const {entry_list,order} = form.field_details;
	let columns = Object.values(entry_list);
	if( ! entryListOnly ){
		Object.values(order).forEach(orderedField => {
			columns.push(orderedField);
		});
	}

	if (includeEntryActions) {
		columns.push({
			name: "Actions",
			id: 'entryActions',
			key: 'entryActions',
		});
	}

	columns.forEach(column => {
		if( ! column.hasOwnProperty('key')){
			column.key = column.hasOwnProperty('id')? column.id : JSON.stringify(Object.keys(column));
		}
		column.key = form.ID + column.key;
	});

	return columns;

}
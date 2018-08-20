//@flow
/**
 * Find field in form by field ID
 *
 * @param {String} fieldId
 * @param {Object} form
 * @return {Object|null}
 */
export const findFieldById = (fieldId : String, form : Object ) : ?Object =>  {
	if( form.hasOwnProperty('fields') && form.fields.hasOwnProperty(fieldId) ) {
		return form.fields[fieldId];
	}

	return null;
};
export const formIdCf1 =  'CF1';



export  const formwithIdCf1 = {
	ID: formIdCf1,
	name: 'name One',
	field_details: {
		'order': {
			'firstName': {
				'id': 'firstName',
				'label': 'First Name'
			},
			'lastName': {
				'id': 'lastName',
				'label': 'Last Name'
			},
			'strongName': {
				'id': 'strongName',
				'label': 'Strong Bad'
			}
		},
		'entry_list': {
			'id': {
				'id': 'id',
				'label': 'ID'
			},
			'datestamp': {
				'id': 'datestamp',
				'label': 'Submitted'
			}
		}
	}

};
export const formWithIdCf2 =  {
	'ID': 'cf2',
	'name': 'Primary Contact Form',
	'fields': {
		'fld_8768091': {
			'ID': 'fld_8768091',
			'label': 'First Name',
			'type': 'text'
		},
		'fld_9970286': {
			'ID': 'fld_9970286',
			'label': 'Last Name',
			'type': 'text'
		},
		'fld_6009157': {
			'ID': 'fld_6009157',
			'label': 'Email Address',
			'type': 'email'
		},
		'fld_7683514': {
			'ID': 'fld_7683514',
			'label': 'Comments Questions',
			'type': 'paragraph'
		}
	},
	'emailIdentifyingFields': [],
	'piiFields': [],
	'privacyExporterEnabled': false,
	field_details: {
		'order': {
			'fld_8768091': {
				'id': 'fld_8768091',
				'label': 'First Name'
			},
			'fld_9970286': {
				'id': 'fld_9970286',
				'label': 'Last Name'
			},
			'fld_6009157': {
				'id': 'fld_6009157',
				'label': 'Email Address'
			},
			'fld_7683514': {
				'id': 'fld_7683514',
				'label': 'Comments Questions'
			}
		},
		entry_list: {
			'id': {
				'id': 'id',
				'label': 'ID'
			},
			'datestamp': {
				'id': 'datestamp',
				'label': 'Submitted'
			}
		}
	},
	'mailer': {
		'active': false
	},
	'entries': {
		count: 3
	}
};
/**
 * Mock form collection.
 */
export default {
	cf1: formwithIdCf1,
	cf2: formWithIdCf2
};
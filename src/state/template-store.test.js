import {
	getFormTemplates,
	setFormTemplates,
	formTemplateReducer,
	SET_FORM_TEMPLATES,
	DEFAULT_TEMPLATES,
} from './templates-store';

describe('Template store', () => {
	const templates = {
		starter_contact_form: 'Contact Form',
		variable_price_example: 'Variable Pricing Form - with add-on products',
		registration: 'Registration Form - with optional additional participants',
		simple_booking_form_example: 'Simple Booking Form',
	};

	const mockState = {
		templates
	};

	describe('getFormTemplates selector', () => {
		it( 'Finds the templates', () => {
			expect(getFormTemplates(mockState)).toEqual(templates);
		});
	});

	describe('setFormTemplates action', () => {
		it( 'Has the right type', () => {
			expect(setFormTemplates(templates).type).toEqual(SET_FORM_TEMPLATES);
		});

		it( 'Has the right payload', () => {
			expect(setFormTemplates(templates).templates).toEqual(templates);
		});
	});

	describe( 'templates reducer', () => {
		it( 'has default state', () => {
			expect(formTemplateReducer(DEFAULT_TEMPLATES, {type: 'INIT'})).toEqual({});
		});

		it( 'Sets the templates', () => {
			expect(formTemplateReducer(DEFAULT_TEMPLATES,setFormTemplates(templates))).toEqual(mockState);
		});
	});


});
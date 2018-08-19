import AdminApp from "./AdminApp";
import {store, state} from '@caldera-labs/state';

const forms = require('./test-data/forms').default;
import {select} from '@wordpress/data';
import ReactDOM from "react-dom";

describe('AdminApp ', () => {
	it('renders without crashing', () => {
		const app = new AdminApp();
		ReactDOM.render(app.component(), document.createElement('div'));
	});

	it('has the api clients', () => {
		const app = new AdminApp();
		expect(typeof app.getApiClients()).toBe('object')
		expect(typeof app.getApiClients().formsAdminApiClient).toBe('object')
	});

	it('returns same instance of store', () => {
		const app = new AdminApp();
		expect(app.getStore()).toBe(app.getStore());
	});

	describe('Dispatching actions', () => {
		it('has dispatch', () => {
			const app = new AdminApp();
			expect(typeof app.getStore().dispatch).toEqual('function');
		});

		it('Can dispatch actions', () => {
			const app = new AdminApp();
			app.getStore().dispatch(
				store.actions.setForms(forms)
			);
			expect(
				app.getStore().getState()[state.CALDERA_FORMS_STORE_SLUG].forms
			).toEqual(forms);
		});
	});

});
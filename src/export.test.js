import admin from './module'
import {dispatchers, selectors} from "./CalderaAdminWithState";

describe('module export', () => {
	it('includes the main component', () => {
		expect(typeof admin.CalderaAdmin).toBe('function');
	});

	it('includes the wrapped component', () => {
		expect(typeof admin.CalderaAdminWithState).toBe('function');
	});

	it('includes the store slug', () => {
		expect(typeof admin.CALDERA_FORMS_ADMIN_STORE).toBe('string');
	});
	it('includes the store ', () => {
		expect(typeof admin.store).toBe('object');
	});
	it('includes the AdminApp factory ', () => {
		expect(typeof admin.AdminApp).toBe('function');
	});
	it('includes the apiClients ', () => {
		expect(typeof admin.apiClients).toBe('object');
	});
	it('includes the dispatchers ', () => {
		expect(typeof admin.dispatchers).toBe('function');
		expect(dispatchers).toEqual(dispatchers);
	});
	it('includes the selectors ', () => {
		expect(typeof admin.selectors).toBe('function');
		expect(admin.selectors).toEqual(selectors);
	});
	it('includes the components ', () => {
		expect(typeof admin.components).toBe('object');
	});
	it('includes the state functions ', () => {
		expect(typeof admin.state).toBe('object');
	});
	it('includes the screens export ', () => {
		expect(typeof admin.screens).toBe('object');
	});
});
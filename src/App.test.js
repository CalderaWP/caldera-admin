import React from 'react';
import CalderaAdminApp from '@caldera-labs/admin-client';
import renderer from 'react-test-renderer';
const {AdminApp,apiClients} = CalderaAdminApp;
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App'
Enzyme.configure({adapter: new Adapter()});


describe('App component', () => {

	it('AdminApp provides a usable component', () => {
		const app = new AdminApp();
		expect( typeof app.component() ).toBe('object' );
	});

	it('AdminApp component matches snapshot', () => {
		const app = new AdminApp();
		const component = renderer.create(
			<React.Fragment>
				{app.component()}
			</React.Fragment>
		);
		expect(  typeof component ).toBe('object');
	});

	describe( 'apiClients', () => {
		it( 'is importable', () => {
			expect( typeof apiClients ).toBe( 'object');
			expect( typeof apiClients.privacySettingsClient ).toBe( 'object');
		});
	});


	it('Passes entry viewer form ID', () => {
		let id = null;
		const component = mount(
			<App
				forms={[
					{
						ID: 'cf1',
						name: 'The Name Of This Form Is Form',
						entries: {
							count: 1
						}
					},

				]}
				getForm={() => {} }
				getForms={() => {} }
				settings={{}}
				onOpenEntryViewerForForm={(formId) => {
					id = formId;
				}}
			/>);

		component.find( '.view-entry-button').simulate( 'click' );
		expect(component.state('entryViewerForm')).toEqual('cf1');

	});


});


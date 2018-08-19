import renderer from 'react-test-renderer';
import React from 'react';
import FormAdminToolbar from './FormAdminToolbar'


describe( 'FormAdminToolbar', () => {
	it( 'snapshots', () => {
		const mainStatus = {
			message: '',
				show: false,
				success: false,
				updating: false
		}
		expect(
			renderer.create(
				<FormAdminToolbar
					mainStatus={mainStatus}
				/>
			).toJSON()
		).toMatchSnapshot();
	});


});


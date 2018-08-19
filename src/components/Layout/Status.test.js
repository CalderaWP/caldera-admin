import React from 'react';
import renderer from "react-test-renderer";
import {Status} from "./Status";


describe( 'Status component', () => {
	it( 'Shows spinner when updating', () => {
		const component = renderer.create(<Status
			updating={true}
		/>);
		expect(component.toJSON()).toMatchSnapshot();
	});

	it( 'Shows message when it should', () => {
		const component = renderer.create(<Status
			updating={false}
			message={'Hi Roy'}
			show={true}
		/>);
		expect(component.toJSON()).toMatchSnapshot();
	});
});
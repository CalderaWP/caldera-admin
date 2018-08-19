import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ProLayoutSettings} from "./ProLayoutSettings";

Enzyme.configure({ adapter: new Adapter() });

describe( 'ProLayoutSettings component', () => {
	it( 'Matches snapshot with minimal props', () => {
		expect(
			renderer.create(
				<ProLayoutSettings/>
			).toJSON()
		).toMatchSnapshot()
	});

	it( 'Is wrapped in the right class', () => {
		expect(
			shallow(
				<ProLayoutSettings/>
			).find( '.' + ProLayoutSettings.classNames.wrapper )
				.length
		).toEqual(1)
	});
});
import renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PrivacySettings} from "./PrivacySettings";

Enzyme.configure({ adapter: new Adapter() });

describe( 'PrivacySettings component', () => {
	it( 'Matches snapshot with minimal props', () => {
		expect(
			renderer.create(
				<PrivacySettings/>
			).toJSON()
		).toMatchSnapshot()
	});

	it( 'Is wrapped in the right class', () => {
		expect(
			shallow(
				<PrivacySettings/>
			).find( '.' + PrivacySettings.classNames.wrapper )
				.length
		).toEqual(1)
	});
});
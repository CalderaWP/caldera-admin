import renderer from 'react-test-renderer';
import React from 'react';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EntryViewerSlot from './EntryViewerSlot'
import forms,{formWithIdCf2} from '../../test-data/forms'
import {mockEntries} from "../../test-data/mockEntries";
import toJson from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});
const handler = () => {
};


describe('Entry Slot component', () => {
	it('Renders empty div when not active and has no form', () => {
		expect(
			renderer.create(
				<EntryViewerSlot
					entries={{}}
				/>
			).toJSON()
		).toMatchSnapshot();
	});

	it('Renders empty div when not active and has form', () => {

		expect(
			renderer.create(
				<EntryViewerSlot
					form={formWithIdCf2}
				/>
			).toJSON()
		).toMatchSnapshot();
	});

	it('Renders empty div when not active and has form and entries', () => {

		expect(
			renderer.create(
				<EntryViewerSlot
					form={formWithIdCf2}
					entries={mockEntries}
				/>
			).toJSON()
		).toMatchSnapshot();
	});


	it('Renders when active and has no entries', () => {
		const component = shallow(
			<EntryViewerSlot
				form={formWithIdCf2}
				entries={{}}
			/>
		);

		component.setState({active: true});
		expect(
			toJson(component)
		).toMatchSnapshot();
	});
	it('Renders when active and has entries', () => {
		const component = shallow(
			<EntryViewerSlot
				form={formWithIdCf2}
				entries={mockEntries}
			/>
		);

		component.setState({active: true});
		expect(
			toJson(component)
		).toMatchSnapshot();
	});


});
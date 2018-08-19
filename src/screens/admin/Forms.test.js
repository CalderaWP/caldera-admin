import renderer from 'react-test-renderer';
import React from 'react';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormsSlot from './FormsSlot';
import forms,{formWithIdCf2} from '../../test-data/forms'
import toJson from 'enzyme-to-json';
import {Form} from "../../components/FormsList/Form";

Enzyme.configure({adapter: new Adapter()});
const handler = () => {
};


describe('FormsSlot component', () => {
	it('Renders empty div when not active and has no forms', () => {
		expect(
			renderer.create(
				<FormsSlot
					forms={{}}
					openEntryViewerForForm={handler}
					onFormUpdate={handler}
				/>
			).toJSON()
		).toMatchSnapshot();
	});

	it('Renders empty div when not active and has forms', () => {
		expect(
			renderer.create(
				<FormsSlot
					forms={forms}
					openEntryViewerForForm={handler}
					onFormUpdate={handler}
				/>
			).toJSON()
		).toMatchSnapshot();
	});
	it('Renders when active and has no forms', () => {
		const component = shallow(<FormsSlot
			forms={{}}
			openEntryViewerForForm={handler}
			onFormUpdate={handler}
		/>);

		component.setState({active: true});
		expect(
			toJson(component)
		).toMatchSnapshot();
	});
	it('Renders when active and has forms', () => {
		const component = shallow(<FormsSlot
			forms={forms}
			openEntryViewerForForm={handler}
			onFormUpdate={handler}
		/>);

		component.setState({active: true});
		expect(
			toJson(component)
		).toMatchSnapshot();
	});



});